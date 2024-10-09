import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import { Card } from "@components/Card";
import { numberFormat } from "@utils/number";

const rules = [
  {
    title: "Betting Steps",
    desc: "Users can connect their wallets and use CFX to purchase votes, 1 vote = 1 CFX, and the minimum bet is 1 vote each time.",
  },
  {
    title: "Betting Opening Time",
    desc: "Betting will stop when the countdown ends.",
  },
  {
    title: "Bonus Distribution",
    desc: (feeRatio: ValidNumber) =>
      `Users who make successful predictions will share all the bonuses in the prize pool according to their respective bet ratios, and the platform only charges a ${numberFormat(
        Unit.fromMinUnit(feeRatio).mul(100).toDecimalMinUnit(),
        0
      )}% service fee. Bonus will be distributed within 24 hours after voting ends.`,
  },
];

const Rule: React.FC<{ className?: string; title: string; desc: string }> = ({
  className,
  title,
  desc,
}) => {
  return (
    <div className={className}>
      <div className="mb-4px text-(gray-60 14px) font-500 lh-22px">{title}</div>
      <div className="text-(gray-80 14px) font-400 lh-22px">{desc}</div>
    </div>
  );
};

export const Rules: React.FC<{
  feeRatio: ValidNumber;
}> = ({ feeRatio }) => {
  return (
    <div>
      <div className="text-(white-normal 14px) font-600 lh-22px mb-12px">
        Rules
      </div>
      <Card className="flex flex-col gap-16px">
        {rules.map((item, index) => (
          <Rule
            title={item.title}
            desc={
              typeof item.desc === "function" ? item.desc(feeRatio) : item.desc
            }
            key={index}
          />
        ))}
      </Card>
    </div>
  );
};
