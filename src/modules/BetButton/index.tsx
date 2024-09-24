import { useState } from "react";
import Button from "@components/Button";
import { Drawer } from "@components/Drawer&Modal";
import Input, { MaxSuffix } from "@components/Input";
import AuthConnectButton from "@modules/AuthConnectButton";
import waiting from "@assets/images/waiting.png";
import submitted from "@assets/images/submitted.png";

const Bet: React.FC<{ onSubmit?: VoidFunction }> = ({ onSubmit }) => {
  return (
    <>
      <div className="flex-center flex-col gap-12px mb-24px">
        <div className="w-84px h-84px rounded-full overflow-hidden">
          <img
            className="w-full h-full"
            src="https://img2.baidu.com/it/u=446981511,947966320&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1727197200&t=3fc1e64aa5ec768a5bf721d5f131d60f"
          />
        </div>
        <div className="text-(#FFF 24px) font-700 lh-32px">Donald Trump</div>
      </div>
      <div className="flex flex-col gap-7px mb-24px">
        <div className="flex justify-between">
          <div className="text-(#FFF 14px) font-400 lh-22px">Amount</div>
          <div className="text-(#A3A3A3 12px) font-400 lh-20px">
            1 CFX = 1 Vote
          </div>
        </div>
        <Input
          wrapperClassName="p-12px rounded-8px bg-#373535"
          className="h-full"
          // disabled={!currentTokenInfo || !currentTokenBalance}
          disabled
          type="number"
          min={1}
          step={1}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") evt.preventDefault();
          }}
          defaultValue={0}
        >
          <MaxSuffix
          // disabled={!currentTokenBalance || !available || available === '0'}
          // onClick={() => {
          //   if (available === '0') return;
          //   clearErrors();
          //   setValue('amount', available);
          // }}
          />
        </Input>
        <div className="text-(#A3A3A3 14px) font-400 lh-22px">
          Available: - CFX
        </div>
      </div>
      <AuthConnectButton className="px-10px py-12px rounded-8px mb-12px w-full">
        <Button
          className="px-10px py-12px rounded-8px mb-12px w-full"
          onClick={onSubmit}
        >
          Bet
        </Button>
      </AuthConnectButton>
      <div className="flex justify-between">
        <div className="text-(#A3A3A3 14px) font-400 lh-22px">Odds</div>
        <div className="text-(#FFF 14px) font-400 lh-22px">50%</div>
      </div>
    </>
  );
};

export const BetButton = () => {
  const [status, setStatus] = useState<"input" | "waiting" | "submitted">(
    "input"
  );
  const onBet = () => {
    setStatus("waiting");
    setTimeout(() => setStatus("submitted"), 2000);
  };
  return (
    <Drawer
      title={status === "input" ? "Bet" : ""}
      trigger={({ triggerProps }) => (
        <Button
          className="px-16px py-10px rounded-8px text-(#191818 14px) font-600 lh-22px"
          {...triggerProps}
        >
          Bet
        </Button>
      )}
    >
      {status === "input" ? (
        <Bet onSubmit={onBet} />
      ) : status === "waiting" ? (
        <div className="flex-col flex-horizontal-center gap-24px text-center">
          <div>
            <img src={waiting} className="w-186px" />
          </div>
          <div>
            <div className="text-(#FFF 16px) font-600 lh-24px mb-8px">
              Waiting for Confirmation
            </div>
            <div className="text-(#A3A3A3 14px) font-400 lh-22px">
              Confirm this transaction in your wallet
            </div>
          </div>
        </div>
      ) : (
        ({ close }) => (
          <div className="flex-col flex-horizontal-center gap-24px text-center">
            <div>
              <img src={submitted} className="w-184px" />
            </div>
            <div>
              <div className="text-(#FFF 16px) font-600 lh-24px mb-8px">
                Transaction Submitted
              </div>
              <div className="text-(#A3A3A3 14px) font-400 lh-22px">
                View on Conflux Scan
              </div>
            </div>
            <Button
              className="px-16px py-10px rounded-8px text-14px font-600 lh-22px"
              onClick={close}
            >
              Close
            </Button>
          </div>
        )
      )}
    </Drawer>
  );
};
