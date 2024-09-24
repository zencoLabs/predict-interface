import { Header } from "../../modules/Header";
import { ReactComponent as VoteIcon } from "@assets/icons/vote.svg";
import { ReactComponent as ClockIcon } from "@assets/icons/clock.svg";
import clsx from "clsx";
import { BetButton } from "../../modules/BetButton";
import Button from "@components/Button";

const TimeCard = () => {
  return (
    <div className="w-56px py-4px rounded-8px flex-center flex-col bg-#262525">
      <div className="text-(#FAE62F 20px) font-600 lh-28px">46</div>
      <div className="text-(#A3A3A3 12px) font-400 lh-20px">DAYS</div>
    </div>
  );
};

const VoteOption = () => {
  return (
    <div className="pt-40px relative">
      <div className="w-80px h-80px absolute top-0 left-16px rounded-full overflow-hidden">
        <img
          className="w-full h-full"
          src="https://img2.baidu.com/it/u=446981511,947966320&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1727197200&t=3fc1e64aa5ec768a5bf721d5f131d60f"
        />
      </div>
      <Card>
        <div className="text-(#FFF 20px) font-700 lh-24px ml-96px mb-16px">
          Donald Trump
        </div>
        <div className="flex-vertical-center justify-between">
          <div className="flex flex-col gap-4px">
            <div className="text-(#A3A3A3 12px) font-400 lh-20px">Votes</div>
            <div className="text-(#FFF 16px) font-500 lh-24px">
              1,000,000 (50%)
            </div>
          </div>
          <div className="flex flex-col gap-4px">
            <div className="text-(#A3A3A3 12px) font-400 lh-20px">Odds</div>
            <div className="text-(#FFF 16px) font-500 lh-24px">0.71</div>
          </div>
          <BetButton />
        </div>
      </Card>
    </div>
  );
};

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-(#A3A3A3 12px) font-400 lh-20px">{title}</div>
);

const Card: React.FC<React.PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("rounded-16px p-16px bg-#262525", className)}>
      {children}
    </div>
  );
};

const Rule: React.FC<{ className?: string; title: string; desc: string }> = ({
  className,
  title,
  desc,
}) => {
  return (
    <div className={className}>
      <div className="mb-4px text-(#D1D1D1 14px) font-500 lh-22px">{title}</div>
      <div className="text-(#A3A3A3 14px) font-400 lh-22px">{desc}</div>
    </div>
  );
};

const rules = [
  {
    title: "Betting steps",
    desc: "Users can connect their wallets and use CFX to purchase votes, 1 vote = 1 CFX, and the minimum bet is 1 vote each time.",
  },
  {
    title: "Betting opening time",
    desc: "From now until 24 hours before the end of the election day.",
  },
  {
    title: "Bonus distribution",
    desc: "Users who make successful predictions will share all the bonuses in the prize pool according to their respective bet ratios, and the platform only charges a 10% service fee.",
  },
];
const claimable = true;

export const Prediction = () => {
  return (
    <>
      <Header />
      <div
        className={clsx(
          "py-18px px-16px flex flex-col gap-24px web-(max-w-520px mx-auto px-0 pt-36px pb-48px)"
        )}
      >
        <div>
          <div className="text-(#FFF 24px) font-700 lh-32px mb-4px web-(text-36px lh-42px font-600 mb-8px)">
            2024 US Election Forecast
          </div>
          <div className="text-(#A3A3A3 14px) font-500 lh-22px flex-vertical-center gap-24px web-(text-16px)">
            <div className="flex-vertical-center">
              <VoteIcon className="mr-8px" />
              5,800,000 CFX Bet
            </div>
            <div className="flex-vertical-center">
              <ClockIcon className="mr-8px" />
              Nov 4, 2024
            </div>
          </div>
        </div>
        <div className="pl-16px pr-8px py-8px border-(1px solid #262525) flex-vertical-center justify-between">
          <div className="text-(#A3A3A3 14px) font-400 lh-22px">
            Election in
          </div>
          <div className="flex-vertical-center gap-8px">
            <TimeCard />
            <TimeCard />
            <TimeCard />
            <TimeCard />
          </div>
        </div>
        <div className="flex flex-col gap-16px">
          <VoteOption />
          <VoteOption />
        </div>
        <div>
          <div className="text-(#FFF 14px) font-600 lh-22px mb-12px">
            My Votes
          </div>
          {claimable && (
            <div className="p-16px flex-vertical-center justify-between border-(1px solid #262525) bg-#191818 rounded-tl-16px rounded-tr-16px">
              <div>
                <div className="text-(#A3A3A3 12px) font-400 lh-20px">
                  Returns
                </div>
                <div className="text-(#FFF 16px) font-600 lh-24px">
                  100,000 CFX
                </div>
              </div>
              <Button
                className="px-16px py-9px rounded-8px text-14px font-600 lh-22px"
                // onClick={close}
              >
                Claim
              </Button>
            </div>
          )}
          <Card
            className={clsx(
              "flex justify-between",
              claimable && "rounded-tl-0px rounded-tr-0px"
            )}
          >
            <div className="flex flex-col gap-16px">
              <TableTitle title="Options" />
              <div className="text-(#FFF 14px) font-400 lh-24px flex-vertical-center">
                <div className="w-24px h-24px mr-8px rounded-full overflow-hidden">
                  <img
                    className="w-full h-full"
                    src="https://img2.baidu.com/it/u=446981511,947966320&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1727197200&t=3fc1e64aa5ec768a5bf721d5f131d60f"
                  />
                </div>
                Donald Trump
              </div>
              <div className="text-(#FFF 14px) font-400 lh-24px flex-vertical-center">
                <div className="w-24px h-24px mr-8px rounded-full overflow-hidden">
                  <img
                    className="w-full h-full"
                    src="https://img2.baidu.com/it/u=446981511,947966320&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1727197200&t=3fc1e64aa5ec768a5bf721d5f131d60f"
                  />
                </div>
                Kamala Harris
              </div>
            </div>
            <div className="flex flex-col gap-16px">
              <TableTitle title="Votes" />
              <div className="text-(#FFF 14px) font-400 lh-24px">100,000</div>
              <div className="text-(#FFF 14px) font-400 lh-24px">100,000</div>
            </div>
            <div className="flex flex-col gap-16px">
              <TableTitle title="If win returns" />
              <div className="text-(#FFF 14px) font-400 lh-24px">100,000</div>
              <div className="text-(#FFF 14px) font-400 lh-24px">100,000</div>
            </div>
          </Card>
        </div>
        <div>
          <div className="text-(#FFF 14px) font-600 lh-22px mb-12px">Rules</div>
          <Card className="flex flex-col gap-16px">
            {rules.map((item, index) => (
              <Rule title={item.title} desc={item.desc} key={index} />
            ))}
          </Card>
        </div>
      </div>
    </>
  );
};
