import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentencecase',
  standalone: true
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string|null|undefined, ...args: unknown[]) {
    if (!value) { return value; }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
