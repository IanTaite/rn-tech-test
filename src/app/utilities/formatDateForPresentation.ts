import { format } from 'date-fns';

export function formatDateForPresentation(date: Date): string {
  return format(date, 'd MMMM yyyy');
}
