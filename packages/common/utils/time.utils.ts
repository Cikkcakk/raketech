import moment from 'moment';

export const timestamp = (timeMs: number): string => {
  return moment(timeMs).utc().format('YYYY-MM-DDTHH:mm:ss.SSS z')
}