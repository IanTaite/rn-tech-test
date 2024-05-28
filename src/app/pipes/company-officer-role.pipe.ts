import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyofficerrole',
  standalone: true
})
export class CompanyOfficerRolePipe implements PipeTransform {
  transform(value: string|null|undefined, ...args: unknown[]) {
    if (!value) { return value; }
    if (value.includes('-')) {
      value = value.replace(/-/g, ' ');
    }
    return value;
  }
}
