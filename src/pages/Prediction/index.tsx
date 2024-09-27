import { Suspense, memo } from "react";
import { Helmet } from "react-helmet-async";
import clsx from "clsx";
import { Header } from "../../modules/Header";
import { ReactComponent as VoteIcon } from "@assets/icons/vote.svg";
import { ReactComponent as ClockIcon } from "@assets/icons/clock.svg";
import {
  PredictionData,
  useAutoRefreshBlockTime,
  useAutoRefreshPrediction,
  usePrediction,
} from "../../services/prediction";
import { formatTimeStamp } from "@utils/date";
import { fromDripToCfx, numberFormat } from "@utils/number";
import { VoteOption } from "@modules/VoteOption";
import { useParsePrediction } from "@hooks/useParsePrediction";
import { MyVotes } from "@modules/MyVotes";
import { Rules } from "@modules/Rules";
import { TimeCard } from "@components/TimeCard";

export const Prediction: React.FC<{
  prediction?: PredictionData | null | undefined;
}> = ({ prediction }) => {
  const {
    totalVotes,
    endTime,
    name,
    description,
    options,
    claimable,
    feeRatio,
    duration,
    isEnd,
  } = useParsePrediction(prediction);
  return (
    <>
      {prediction && (
        <Helmet>
          <title>{name}</title>
          <meta name="description" content={description} />
        </Helmet>
      )}
      <Header />
      <div
        className={clsx(
          "py-18px px-16px flex flex-col gap-24px web-(max-w-520px mx-auto px-0 pt-36px pb-48px)"
        )}
      >
        <div>
          <div className="text-(white-normal 24px) font-700 lh-32px mb-4px web-(text-36px lh-42px font-600 mb-8px)">
            {name}
          </div>
          <div className="text-(gray-80 14px) font-500 lh-22px flex-vertical-center gap-24px web-(text-16px)">
            <div className="flex-vertical-center">
              <VoteIcon className="mr-8px" />
              {numberFormat(fromDripToCfx(totalVotes))} CFX Bet
            </div>
            <div className="flex-vertical-center">
              <ClockIcon className="mr-8px" />
              {formatTimeStamp(endTime)}
            </div>
          </div>
        </div>
        <div className="pl-16px pr-8px py-8px border-(1px solid gray-90) flex-vertical-center justify-between rounded-8px">
          <div className="text-(gray-80 14px) font-400 lh-22px">
            Election in
          </div>
          <div className="flex-vertical-center gap-8px">
            {isEnd ? (
              <span className="text-(gray-60 16px) font-600 lh-24px">
                Ended
              </span>
            ) : (
              duration.map((d, i) => (
                <TimeCard typeIndex={i} key={i} value={d} />
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-16px">
          {options.map((o, i) => (
            <VoteOption key={i} option={o} isEnd={isEnd} />
          ))}
        </div>
        <MyVotes claimable={claimable} options={options} feeRatio={feeRatio} />
        <Rules />
      </div>
    </>
  );
};

const Query: React.FC = memo(() => {
  useAutoRefreshPrediction();
  useAutoRefreshBlockTime();
  const prediction = usePrediction();
  return <Prediction prediction={prediction} />;
});

const PredictionPage = () => {
  return (
    <Suspense fallback={<Prediction />}>
      <Query />
    </Suspense>
  );
};

export default PredictionPage;
