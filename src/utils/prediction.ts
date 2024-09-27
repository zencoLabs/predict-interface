import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import { fromDripToCfx, numberFormat } from "./number";

export const calcOdds = ({
  totalVotes,
  optionVote,
  input: _input,
  decimals,
  minNum = 0.01,
}: {
  totalVotes: ValidNumber;
  optionVote: ValidNumber;
  input?: ValidNumber;
  decimals?: number | undefined;
  minNum?: number;
}) => {
  const inputUnit = Unit.fromStandardUnit(_input || 0, decimals);
  if (Unit.fromMinUnit(optionVote).add(inputUnit).equals(0)) {
    return "-";
  }
  const oddsUnit = Unit.fromMinUnit(totalVotes)
    .sub(optionVote)
    .div(inputUnit.add(optionVote));
  if (oddsUnit.lessThan(minNum)) {
    return `< ${minNum}`;
  }
  return numberFormat(oddsUnit.toDecimalMinUnit(), 2);
};

export const calcReturns = ({
  totalVotes,
  optionVote,
  feeRatio,
  userVote,
  totalUserVotes,
  minNum = 0.01,
}: {
  totalVotes: ValidNumber;
  optionVote: ValidNumber;
  userVote: ValidNumber;
  totalUserVotes: ValidNumber;
  feeRatio: ValidNumber;
  minNum?: number;
}) => {
  const returnsUnit = Unit.fromMinUnit(totalVotes)
    .mul(feeRatio)
    .mul(userVote)
    .div(optionVote)
    .add(userVote)
    .sub(totalUserVotes);
  if (returnsUnit.lessThan(minNum)) {
    return `< ${minNum}`;
  }
  return numberFormat(fromDripToCfx(returnsUnit.toDecimalMinUnit()), 2);
};
