import { Pipe, PipeTransform } from '@angular/core';
import { formatDateForPresentation } from '../utilities/formatDateForPresentation';

@Pipe({
  name: 'incorporationdate',
  standalone: true
})
export class IncorporationDatePipe implements PipeTransform {

  transform(value: string|null|undefined, ...args: unknown[]) {
    if (!value) { return value; }
    return formatDateForPresentation(new Date(value));
  }

}
