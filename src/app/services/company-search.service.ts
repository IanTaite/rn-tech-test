import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, effect } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  IApiSearchCompaniesResponse,
  IApiSearchCompany,
  IApiSearchCompanyOfficersResponse,
  IApiSearchCompanyOfficer,
} from '@models/api';
import {
  ISearchCompaniesResponse,
  ISearchCompanyDetail,
  ISearchCompanyOfficersResponse,
  ISearchCompanyOfficer,
} from '@models/vm';

@Injectable({
  providedIn: 'root',
})
export class CompanySearchService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000/api';
  private readonly STORAGE_KEY = 'companySearchService_state';

  private _searchTerm = signal<string>('');
  private _companySearchResults = signal<ISearchCompaniesResponse | null>(null);
  private _companySearchError = signal<Error | null>(null);
  private _selectedCompany = signal<ISearchCompanyDetail | null>(null);
  private _selectedCompanyOfficers = signal<ISearchCompanyOfficersResponse | null>(null);
  private _selectedCompanyOfficersError = signal<Error | null>(null);

  searchTerm = this._searchTerm.asReadonly();
  companySearchResults = this._companySearchResults.asReadonly();
  companySearchError = this._companySearchError.asReadonly();
  selectedCompany = this._selectedCompany.asReadonly();
  selectedCompanyOfficers = this._selectedCompanyOfficers.asReadonly();
  selectedCompanyOfficersError = this._selectedCompanyOfficersError.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        searchTerm: this._searchTerm(),
        companySearchResults: this._companySearchResults(),
        companySearchError: this._companySearchError(),
        selectedCompany: this._selectedCompany(),
        selectedCompanyOfficers: this._selectedCompanyOfficers(),
        selectedCompanyOfficersError: this.selectedCompanyOfficersError(),
      }));
    });
    try {
      const storedDataAsString = localStorage.getItem(this.STORAGE_KEY);
      if (storedDataAsString) {
        const storedData = JSON.parse(storedDataAsString);
        this._searchTerm.set(storedData.searchTerm);
        this._companySearchResults.set(storedData.companySearchResults);
        this._companySearchError.set(storedData.companySearchError);
        this._selectedCompany.set(storedData.selectedCompany);
        this._selectedCompanyOfficers.set(storedData.selectedCompanyOfficers);
        this._selectedCompanyOfficersError.set(storedData.selectedCompanyOfficersError);
      }
    } catch {
    }
  }

  searchForCompanies(searchTerm: string): Observable<ISearchCompaniesResponse> {
    const URL = `${this.BASE_URL}/Search`;
    const params = new HttpParams().set('Query', searchTerm);
    this._companySearchResults.set(null);
    this._companySearchError.set(null);
    return this.http.get<IApiSearchCompaniesResponse>(URL, { params }).pipe(
      map((data) => this.mapApiCompanySearchResultToViewModel(data)),
      tap((data) => this._companySearchResults.set(data)),
      catchError((err) => {
        this._companySearchError.set(err);
        return throwError(() => err);
      })
    );
  }

  private mapApiCompanySearchResultToViewModel(
    input: IApiSearchCompaniesResponse
  ): ISearchCompaniesResponse {
    const output: ISearchCompaniesResponse = {
      page_number: input.page_number,
      total_results: input.total_results ?? 0,
      items: input.items
        ? input.items.map((item: IApiSearchCompany) => {
            return {
              title: item.title,
              description: item.description,
              address_snippet: item.address_snippet,
              company_number: item.company_number,
              company_status: item.company_status,
              company_type: item.company_type,
              incorporation_date: item.date_of_creation,
            } as ISearchCompanyDetail;
          })
        : [],
    };
    return output;
  }

  setSearchTerm(searchTerm: string) {
    this._searchTerm.set(searchTerm);
  }

  setSelectedCompany(companyNumber: string) {
    if (this._companySearchResults() !== null && this._companySearchResults()?.items) {
      const selectedCompany = this._companySearchResults()?.items.find(
        (company) => company.company_number === companyNumber
      );
      if (selectedCompany) {
        this._selectedCompany.set(selectedCompany);
      }
    }
  }

  findCompanyOfficers(
    companyNumber: string
  ): Observable<ISearchCompanyOfficersResponse> {
    const URL = `${this.BASE_URL}/Officers`;
    const params = new HttpParams().set('CompanyNumber', companyNumber);
    this._selectedCompanyOfficers.set(null);
    this._selectedCompanyOfficersError.set(null);
    return this.http
      .get<IApiSearchCompanyOfficersResponse>(URL, { params })
      .pipe(
        map((data) => this.mapApiCompanyOfficersSearchResultToViewModel(data)),
        tap((data) => this._selectedCompanyOfficers.set(data)),
        catchError((err) => {
          this._selectedCompanyOfficersError.set(err);
          return throwError(() => err);
        })
      );
  }

  private mapApiCompanyOfficersSearchResultToViewModel(
    input: IApiSearchCompanyOfficersResponse
  ) {
    const output: ISearchCompanyOfficersResponse = {
      items_per_page: input.items_per_page,
      items: input.items
        ? input.items.map((item: IApiSearchCompanyOfficer) => {
            return {
              name: item.name,
              officer_role: item.officer_role,
            } as ISearchCompanyOfficer;
          })
        : [],
    };
    return output;
  }
}
