import { Card } from "@components/Card";
import { BetButton } from "@modules/BetButton";
import { fromDripToCfx, numberFormat } from "@utils/number";
import { ReactComponent as CrownIcon } from "@assets/icons/crown.svg";
import { ReactComponent as WinIcon } from "@assets/icons/win.svg";

export interface PredictionOption {
  name: string;
  votes: bigint;
  totalVotes: bigint;
  percent: string;
  index: number;
  odds: string;
  logo: string;
  isWin: boolean;
}

export const VoteOption: React.FC<{
  option: PredictionOption;
  isEnd: boolean;
}> = ({ option, isEnd }) => {
  const { name, votes, percent, odds, logo, isWin } = option;
  return (
    <div className="pt-40px relative">
      <div className="w-80px h-80px absolute top-0 left-16px z-1">
        {isWin && <CrownIcon className="absolute top--28px left--10px" />}
        <img className="w-full h-full rounded-full" src={logo} />
      </div>
      <Card className="relative">
        {isWin && (
          <div className="absolute top-0 right-0 w-42px h-24px">
            <WinIcon />
            <span className="absolute left-0 top-0 w-full text-(center #966B17 14px) font-600 lh-22px select-none">
              Win
            </span>
          </div>
        )}
        <div className="text-(white-normal 20px) font-700 lh-24px ml-96px mb-16px">
          {name}
        </div>
        <div className="flex-vertical-center justify-between">
          <div className="flex flex-col gap-4px">
            <div className="text-(gray-80 12px) font-400 lh-20px">Votes</div>
            <div className="text-(white-normal 16px) font-500 lh-24px">
              {numberFormat(fromDripToCfx(votes))} ({percent}%)
            </div>
          </div>
          <div className="flex flex-col gap-4px">
            <div className="text-(gray-80 12px) font-400 lh-20px">Odds</div>
            <div className="text-(white-normal 16px) font-500 lh-24px">
              {odds}
            </div>
          </div>
          {!isEnd && <BetButton option={option} />}
        </div>
      </Card>
    </div>
  );
};
