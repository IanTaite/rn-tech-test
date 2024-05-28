import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CompanySearchService } from '@services';
import { CompanyOfficerComponent, PageHeadingComponent } from '@components';

@Component({
  selector: 'app-company-officers-page',
  standalone: true,
  imports: [
    UpperCasePipe,
    PageHeadingComponent,
    CompanyOfficerComponent,
  ],
  templateUrl: './officer-list-page.component.html',
  styleUrl: './officer-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfficerListPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly companySearchService = inject(CompanySearchService);

  company = this.companySearchService.selectedCompany;
  officers = this.companySearchService.selectedCompanyOfficers;

  ngOnInit(): void {
    if (this.company() === null) {
      this.router.navigateByUrl('/company-details');
    }
  }

  onBackToSearch_click() {
    this.router.navigateByUrl('/');
  }

  onBackToSearchResults_click() {
    this.router.navigateByUrl('/search-results');
  }

  onBackToCompanyDetails_click() {
    this.router.navigateByUrl('/company-details');
  }
}
