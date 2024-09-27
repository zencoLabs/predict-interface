import dayjs from "dayjs";

export const formatTimeStamp = (time?: ValidNumber) => {
  if (!time) {
    return "--";
  }
  const date = Number(time) * 1000;
  return dayjs(date).format("MMM D, YYYY");
};

export const getDuration = ({
  from,
  to,
}: {
  from?: ValidNumber | undefined;
  to: ValidNumber | undefined;
}) => {
  if (!to) {
    return [0, 0, 0, 0];
  }
  const pFrom = Number(from);
  const pTo = Number(to);
  try {
    const from = pFrom * 1000 || +new Date();
    const to = pTo * 1000;

    if (from > to) {
      throw new Error("invalid timestamp pair");
    }

    const dayjsTo = dayjs(to);

    const fullDay = dayjsTo.diff(from, "day");
    const fullHour = dayjsTo.diff(from, "hour");
    const fullMinute = dayjsTo.diff(from, "minute");

    const day = dayjsTo.diff(from, "day");
    const hour = dayjsTo.subtract(fullDay, "day").diff(from, "hour");
    const minute = dayjsTo.subtract(fullHour, "hour").diff(from, "minute");
    const second = dayjsTo.subtract(fullMinute, "minute").diff(from, "second");

    return [day, hour, minute, second];
  } catch (e) {
    return [0, 0, 0, 0];
  }
};
