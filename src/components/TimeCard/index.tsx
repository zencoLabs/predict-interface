export const timeType = ["DAYS", "HRS", "MIN", "SEC"] as const;

export const TimeCard: React.FC<{
  typeIndex: number;
  value: number;
}> = ({ typeIndex, value }) => {
  return (
    <div className="w-56px py-4px rounded-8px flex-center flex-col bg-gray-90">
      <div className="text-(yellow-100 20px) font-600 lh-28px">{value}</div>
      <div className="text-(gray-80 12px) font-400 lh-20px">
        {timeType[typeIndex]}
      </div>
    </div>
  );
};
