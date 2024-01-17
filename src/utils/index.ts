/** @format */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const formatRelativeTime = (seconds: number) => {
  const duration = dayjs.duration(seconds, "seconds");
  return duration.humanize();
};

export const formatDate = (date: string, format: string = "DD MMMM YYYY") =>
  dayjs(date).format(format);

export const padWithZero = (number: number) =>
  number < 10 && number > 0 ? `0${number}` : `${number}`;

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatAmount = (value: string) =>
  "£" +
  Number(value).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
