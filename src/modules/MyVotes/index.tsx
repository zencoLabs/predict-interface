import { Card } from "@components/Card";
import clsx from "clsx";
import { Suspense, memo, useMemo } from "react";
import {
  useAutoRefreshUserVotes,
  useUserVotes,
} from "../../services/prediction";
import { PredictionOption } from "@modules/VoteOption";
import { fromDripToCfx, numberFormat } from "@utils/number";
import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import { calcReturns } from "@utils/prediction";
import { Claim } from "@modules/Claim";
import { OptionLogo } from "@modules/OptionLogo";

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-(gray-80 12px) font-400 lh-20px">{title}</div>
);

interface BaseProps {
  claimable: boolean;
  options: PredictionOption[];
  feeRatio: ValidNumber;
}

const Content: React.FC<
  {
    votes?: ReturnType<typeof useUserVotes>;
  } & BaseProps
> = ({ votes, claimable, options, feeRatio }) => {
  const empty = !votes || votes.every((v) => Unit.equals(v, 0));
  const { nameList, voteList, returnsList } = useMemo(() => {
    let nameList: React.ReactNode[] = [];
    let voteList: React.ReactNode[] = [];
    let returnsList: React.ReactNode[] = [];
    if (!empty && options.length > 0) {
      const totalUserVotes = votes?.reduce((sum, cur) => sum + cur, 0n) ?? 0n;
      votes?.forEach((vote, i) => {
        if (Unit.equals(vote, 0)) {
          return null;
        }
        const option = options[i];
        nameList.push(
          <div
            className="text-(white-normal 14px) font-400 lh-24px flex-vertical-center"
            key={i}
          >
            <div className="w-24px h-24px mr-8px rounded-full overflow-hidden">
              <OptionLogo className="w-full h-full" src={option.logo} />
            </div>
            {option.name}
          </div>
        );
        voteList.push(
          <div className="text-(white-normal 14px) font-400 lh-24px" key={i}>
            {numberFormat(fromDripToCfx(vote))}
          </div>
        );
        returnsList.push(
          <div className="text-(white-normal 14px) font-400 lh-24px" key={i}>
            {calcReturns({
              totalUserVotes,
              totalVotes: option.totalVotes,
              optionVote: option.votes,
              userVote: vote,
              feeRatio,
            })}
          </div>
        );
      });
    }
    return {
      nameList,
      voteList,
      returnsList,
    };
  }, [votes, empty, options]);
  if (empty || options.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="text-(white-normal 14px) font-600 lh-22px mb-12px">
        My Votes
      </div>
      <Claim claimable={claimable} />
      <Card
        className={clsx(
          "flex justify-between",
          claimable && "rounded-tl-0px rounded-tr-0px"
        )}
      >
        <div className="flex flex-col gap-16px">
          <TableTitle title="Options" />
          {nameList}
        </div>
        <div className="flex flex-col gap-16px">
          <TableTitle title="Votes" />
          {voteList}
        </div>
        <div className="flex flex-col gap-16px">
          <TableTitle title="If win returns" />
          {returnsList}
        </div>
      </Card>
    </div>
  );
};

const Query: React.FC<BaseProps> = memo((props) => {
  useAutoRefreshUserVotes();
  const votes = useUserVotes();
  return <Content votes={votes} {...props} />;
});
export const MyVotes: React.FC<BaseProps> = (props) => {
  return (
    <Suspense fallback={<Content {...props} />}>
      <Query {...props} />
    </Suspense>
  );
};
