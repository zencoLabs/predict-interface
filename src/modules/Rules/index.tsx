import { Card } from "@components/Card";

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

export const Rules = () => {
  return (
    <div>
      <div className="text-(white-normal 14px) font-600 lh-22px mb-12px">Rules</div>
      <Card className="flex flex-col gap-16px">
        {rules.map((item, index) => (
          <Rule title={item.title} desc={item.desc} key={index} />
        ))}
      </Card>
    </div>
  );
};
