import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companytype',
  standalone: true
})
export class CompanyTypePipe implements PipeTransform {
  transform(value: string|null|undefined, ...args: unknown[]) {
    if (!value) { return value; }
    const replacements: { [key: string]: string } = {
      'ltd': 'Private Limited Company',
    };
    if (replacements[value]) {
      return replacements[value];
    }
    value = value.replace(/-/g, ' ');
    return value;
  }
}
