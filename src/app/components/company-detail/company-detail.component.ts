import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CompanyTypePipe, IncorporationDatePipe, SentenceCasePipe } from '@pipes';
import { ISearchCompanyDetail } from '@models/vm';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    CompanyTypePipe,
    IncorporationDatePipe,
    SentenceCasePipe,
    TitleCasePipe
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {
  company = input.required<ISearchCompanyDetail>();
  listOfficers = output();
}
