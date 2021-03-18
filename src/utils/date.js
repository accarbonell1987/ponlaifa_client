import { DateTime } from 'luxon';

export const getDate = (date) => DateTime.fromISO(date).toSQL({ includeOffset: false });
