import { startTransition, useMemo, useState } from "react";
import Button from "@components/Button";
import { Drawer } from "@components/Drawer&Modal";
import Input, { MaxSuffix } from "@components/Input";
import AuthConnectButton from "@modules/AuthConnectButton";
import waiting from "@assets/images/waiting.png";
import submitted from "@assets/images/submitted.png";
import failed from "@assets/images/failed.png";
import { PredictionOption } from "@modules/VoteOption";
import { useForm } from "react-hook-form";
import { calcOdds } from "@utils/prediction";
import { useBalance } from "@cfx-kit/react-utils/dist/AccountManage";
import { numberFormat } from "@utils/number";
import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import {
  bet,
  useRefreshPrediction,
  useRefreshUserVotes,
} from "../../services/prediction";
import { useParams } from "react-router-dom";

type Status = "input" | "waiting" | "submitted" | "failed";

const Bet: React.FC<{
  onStatus?: (
    status: Status,
    extra?: {
      hash?: string;
      error?: unknown;
    }
  ) => void;
  option: PredictionOption;
}> = ({ onStatus, option }) => {
  const {
    register,
    handleSubmit: withForm,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const refreshPrediction = useRefreshPrediction();
  const refreshUserVotes = useRefreshUserVotes();
  const { id } = useParams<{ id: string }>();
  const balance = useBalance();
  const max = useMemo(() => {
    return Math.floor(Number(balance?.toDecimalStandardUnit() ?? 0));
  }, [balance]);
  const amount = watch("amount", "") as string;
  const odds = useMemo(
    () =>
      calcOdds({
        input: amount,
        totalVotes: option.totalVotes,
        optionVote: option.votes,
      }),
    [option.totalVotes, option.votes, amount]
  );
  const handleSubmit = withForm(async (data) => {
    try {
      if (!id) return;
      onStatus?.("waiting");
      const { txHash, wait } = await bet({
        pid: id,
        option: option.index,
        value: data.amount,
      });
      if (!txHash) return;
      setValue("amount", "0");
      onStatus?.("submitted", {
        hash: txHash,
      });
      await wait();
      startTransition(() => {
        refreshPrediction();
        refreshUserVotes();
      });
    } catch (err) {
      console.log("bet error", err);
      onStatus?.("failed", {
        error: err,
      });
    }
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-center flex-col gap-12px mb-24px">
        <div className="w-84px h-84px rounded-full overflow-hidden">
          <img className="w-full h-full" src={option.logo} />
        </div>
        <div className="text-(white-normal 24px) font-700 lh-32px">{option.name}</div>
      </div>
      <div className="flex flex-col gap-7px mb-24px">
        <div className="flex justify-between">
          <div className="text-(white-normal 14px) font-400 lh-22px">Amount</div>
          <div className="text-(gray-80 12px) font-400 lh-20px">
            1 CFX = 1 Vote
          </div>
        </div>
        <Input
          wrapperClassName="p-12px rounded-8px bg-#373535"
          className="h-full"
          disabled={!max}
          type="number"
          step="any"
          pattern="\d*"
          {...register("amount", {
            validate: (_value: unknown) => {
              const value = String(_value ?? "0");
              const valueUnit = Unit.fromMinUnit(value);
              if (
                !value ||
                value.includes(".") ||
                valueUnit.greaterThan(max) ||
                valueUnit.lessThan(1)
              ) {
                return false;
              }
            },
          })}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") evt.preventDefault();
          }}
          defaultValue={0}
        >
          <MaxSuffix
            disabled={!max}
            onClick={() => {
              clearErrors();
              setValue("amount", max);
            }}
          />
        </Input>
        {errors.amount && (
          <div className="text-(red 14px) font-400 lh-22px">
            input is invalid
          </div>
        )}
        <div className="text-(gray-80 14px) font-400 lh-22px">
          Available: {numberFormat(max)} CFX
        </div>
      </div>
      <AuthConnectButton className="px-10px py-12px rounded-8px mb-12px w-full">
        <Button
          className="px-10px py-12px rounded-8px mb-12px w-full"
          type="submit"
          disabled={!max}
        >
          Bet
        </Button>
      </AuthConnectButton>
      <div className="flex justify-between">
        <div className="text-(gray-80 14px) font-400 lh-22px">Odds</div>
        <div className="text-(white-normal 14px) font-400 lh-22px">{odds}</div>
      </div>
    </form>
  );
};

const BetStatus: React.FC<{
  close?: VoidFunction;
  img: string;
  imgClassName: string;
  title: string;
  desc?: React.ReactNode;
}> = ({ close, img, imgClassName, title, desc }) => {
  return (
    <div className="flex-col flex-horizontal-center gap-24px text-center">
      <div>
        <img src={img} className={imgClassName} />
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-(white-normal 16px) font-600 lh-24px">{title}</div>
        {desc}
      </div>
      {close && (
        <Button
          className="px-16px py-10px rounded-8px text-14px font-600 lh-22px"
          onClick={close}
        >
          Close
        </Button>
      )}
    </div>
  );
};

export const BetButton: React.FC<{
  option: PredictionOption;
}> = ({ option }) => {
  const [status, setStatus] = useState<Status>("input");
  const [hash, setHash] = useState("");
  const refreshPrediction = useRefreshPrediction();
  return (
    <Drawer
      title={status === "input" ? "Bet" : ""}
      trigger={({ triggerProps }) => (
        <Button
          className="px-16px py-10px rounded-8px text-(gray-100 14px) font-600 lh-22px"
          {...triggerProps}
        >
          Bet
        </Button>
      )}
      onOpen={() => {
        startTransition(() => {
          refreshPrediction();
        });
      }}
      onClose={() => {
        setStatus("input");
        setHash("");
      }}
    >
      {status === "input" ? (
        <Bet
          onStatus={(status, { hash } = {}) => {
            setStatus(status);
            hash && setHash(hash);
          }}
          option={option}
        />
      ) : status === "waiting" ? (
        <BetStatus
          img={waiting}
          imgClassName="w-186px"
          title="Waiting for Confirmation"
          desc={
            <div className="text-(gray-80 14px) font-400 lh-22px">
              Confirm this transaction in your wallet
            </div>
          }
        />
      ) : status === "submitted" ? (
        ({ close }) => (
          <BetStatus
            img={submitted}
            imgClassName="w-184px"
            title="Transaction Submitted"
            desc={
              <div
                className="text-(yellow-100 12px) font-400 lh-22px cursor-pointer"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_ESpaceScanUrl}/tx/${hash}`,
                    "_blank"
                  )
                }
              >
                View on Conflux Scan
              </div>
            }
            close={close}
          />
        )
      ) : (
        ({ close }) => (
          <BetStatus
            img={failed}
            imgClassName="w-432px"
            close={close}
            title="Transaction Failed"
          />
        )
      )}
    </Drawer>
  );
};
