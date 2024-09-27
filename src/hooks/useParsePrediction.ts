import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import { PredictionOption } from "@modules/VoteOption";
import { useMemo } from "react";
import { useLocalBlockTime, type PredictionData } from "../services/prediction";
import { calcOdds } from "@utils/prediction";
import { BASE_FEE_RATIO } from "@constants/index";
import { getDuration } from "@utils/date";

export const useParsePrediction = (
  prediction: PredictionData | null | undefined
) => {
  const blockTime = useLocalBlockTime();
  const predictionInfo = useMemo(() => {
    const {
      name = "--",
      description = "--",
      endTime = 0,
      options: _options = [],
      optionLogos = [],
      optionVotes = [],
      outcome: _outcome = 0,
      feeRatio = 0n,
    } = prediction ?? {};
    const outcome = Number(_outcome);
    const totalVotes = optionVotes.reduce((sum, cur) => sum + cur, 0n);
    let leftPercent = Unit.fromMinUnit(100);
    const options: PredictionOption[] = _options.map((option, i) => {
      const percentUnit =
        i < _options.length - 1
          ? Unit.fromMinUnit(optionVotes[i]).mul(100).div(totalVotes)
          : Unit.fromDecimal(leftPercent);
      const percent = Math.floor(Number(percentUnit.toDecimalMinUnit()));
      leftPercent = leftPercent.sub(percent);
      return {
        name: option,
        logo: optionLogos[i],
        votes: optionVotes[i],
        totalVotes,
        percent: percent === 0 || isNaN(percent) ? "-" : String(percent),
        odds: calcOdds({
          totalVotes,
          optionVote: optionVotes[i],
        }),
        index: i,
        isWin: outcome === i,
      };
    });
    return {
      totalVotes,
      options,
      endTime,
      name,
      description,
      claimable: outcome < options.length,
      feeRatio: Unit.fromMinUnit(BASE_FEE_RATIO)
        .sub(feeRatio)
        .div(BASE_FEE_RATIO)
        .toDecimalMinUnit(),
    };
  }, [prediction]);
  const timeInfo = useMemo(() => {
    const { endTime = 0 } = prediction ?? {};
    return {
      duration: getDuration({
        from: blockTime,
        to: endTime,
      }),
      isEnd: predictionInfo.claimable || blockTime >= endTime,
    };
  }, [prediction, blockTime, predictionInfo.claimable]);
  return useMemo(
    () => ({ ...predictionInfo, ...timeInfo }),
    [predictionInfo, timeInfo]
  );
};
