/** @format */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const formatRelativeTime = (seconds: number) => {
  const duration = dayjs.duration(seconds, 'seconds');
  return duration.humanize();
};

export const formatDate = (date: string) => dayjs(date).format('DD MMMM YYYY');

export const padWithZero = (number: number) =>
  number < 10 && number > 0 ? `0${number}` : `${number}`;
