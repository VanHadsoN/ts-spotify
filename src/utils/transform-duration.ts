import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export const transformDuration = (duration: number) => dayjs.unix(duration).utc().format('m:ss');
