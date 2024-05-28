import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, WritableSignal, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanySearchService } from '../../services/company-search.service';
import { PageHeadingComponent } from '@components';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageHeadingComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox!: ElementRef;

  private readonly fb = inject(NonNullableFormBuilder);
  private companySearchService = inject(CompanySearchService);
  private router = inject(Router);

  searchTerm!: WritableSignal<string>;
  noResultsMessage = signal('');

  form = this.fb.group({
    searchTerm: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.form.setValue({ searchTerm: this.companySearchService.searchTerm() });
    this.form.valueChanges.subscribe((value) => {
      this.companySearchService.setSearchTerm(value.searchTerm ?? '')
    });
  }

  ngAfterViewInit(): void {
    this.setFocusOnSearchBox();
  }

  searchTermIsInvalid() {
    return this.form.get('searchTerm')?.invalid && this.form.get('searchTerm')?.touched;
  }

  searchTermIsPristine() {
    return this.searchTermControl?.pristine;
  }
  searchTermIsDirty() {
    return this.searchTermControl?.dirty;
  }
  searchTermIsTouched() {
    return this.searchTermControl?.touched;
  }
  searchTermIsUnTouched() {
    return this.searchTermControl?.untouched;
  }
  get searchTermControl() {
    return this.form.get('searchTerm');
  }

  searchTermControlHasError(errorName: string) {
    return this.searchTermControl?.hasError(errorName);
  }

  onSearch_click() {
    this.noResultsMessage.set('');
    const term = (this.form.value.searchTerm ?? '').trim();
    if (term) {
      this.companySearchService.searchForCompanies(term).subscribe({
        next: (data) => {
          if (data.total_results === 0) {
            this.noResultsMessage.set('No results found');
            this.setFocusOnSearchBox();
          } else {
            this.router.navigate(['/search-results']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private setFocusOnSearchBox() {
    this.searchBox.nativeElement.focus();
  }
}
