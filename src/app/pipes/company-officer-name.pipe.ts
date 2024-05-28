import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyofficername',
  standalone: true
})
export class CompanyOfficerNamePipe implements PipeTransform {
  transform(value: string|null|undefined, ...args: unknown[]) {
    if (!value) { return value; }
    if (value.includes(', ')) {
      const parts = value.split(', ');
      return `${parts[1]} ${parts[0]}`;
    }
    return value;
  }
}
