import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { formatDateForPresentation } from '@utilities';
import { ISearchCompanyDetail } from '@models/vm';

@Component({
  selector: 'app-company-summary',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe
  ],
  templateUrl: './company-summary.component.html',
  styleUrl: './company-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySummaryComponent {
  company = input.required<ISearchCompanyDetail>();
  companySelected = output<string>();

  get companyNumberHelper() {
    return this.company().description.split(' - ')[0];
  }

  get incorporatedHelper() {
    return this.company().description.split(' - ')[1];
  }

  formatDate(date: Date): string {
    return formatDateForPresentation(date);
  }

  onTitle_click() {
    this.companySelected.emit(this.company().company_number);
  }
}
