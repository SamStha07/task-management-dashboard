import { format } from 'date-fns';

export function dateFormat(date: Date) {
  return format(new Date(date), 'MMM dd, yyyy');
}
