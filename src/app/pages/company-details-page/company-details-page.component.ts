import { ChangeDetectionStrategy, Component, WritableSignal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CompanySearchService } from '@services';
import { CompanyDetailComponent, PageHeadingComponent } from '@components';
import { ISearchCompanyDetail } from '@models/vm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-details-page',
  standalone: true,
  imports: [
    PageHeadingComponent,
    CompanyDetailComponent
  ],
  templateUrl: './company-details-page.component.html',
  styleUrl: './company-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailsPageComponent {
  private router = inject(Router);
  private companySearchService = inject(CompanySearchService);
  private officerSearchSubscription: Subscription | null = null;
  selectedCompany!: ISearchCompanyDetail | null;

  ngOnInit(): void {
    this.selectedCompany = this.companySearchService.selectedCompany();

    if (this.selectedCompany === null) {
      this.router.navigateByUrl('/');
    }
  }

  onListOfficers(): void {
    if (this.selectedCompany && !this.officerSearchSubscription) {
      this.officerSearchSubscription = this.companySearchService.findCompanyOfficers(this.selectedCompany?.company_number)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/officer-list');
          },
          error: (err) => {
            console.log('Failed to find officers for company');
            console.error(err);
            this.officerSearchSubscription = null;
          },
          complete: () => {
            this.officerSearchSubscription = null;
          }
        });
    }
  }

  onBackToSearch_click() {
    this.router.navigateByUrl('/');
  }

  onBackToSearchResults_click() {
    this.router.navigateByUrl('/search-results');
  }
}
