import {minutesInHour} from 'date-fns';


export function getRunTime(minutes: number) {
  const hours = Math.floor(minutes / minutesInHour);
  if (!hours) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes % minutesInHour}m`;
}
