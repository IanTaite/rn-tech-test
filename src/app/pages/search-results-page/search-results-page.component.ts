import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CompanySearchService } from '@services';
import { ISearchCompaniesResponse } from '@models/vm';
import { CompanySummaryComponent, PageHeadingComponent } from '@components';

@Component({
  selector: 'app-search-results-page',
  standalone: true,
  imports: [
    PageHeadingComponent,
    CompanySummaryComponent
  ],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsPageComponent implements OnInit {
  private router = inject(Router);
  private companySearchService = inject(CompanySearchService);

  results!: Signal<ISearchCompaniesResponse | null>;

  ngOnInit(): void {
    this.results = this.companySearchService.companySearchResults;
  }

  onCompanySelected(companyNumber: string) {
    this.companySearchService.setSelectedCompany(companyNumber);
    this.router.navigateByUrl('/company-details');
  }
  onBackToSearch_click() {
    this.router.navigateByUrl('/');
  }
}
