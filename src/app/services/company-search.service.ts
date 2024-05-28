import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, effect } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  IApiSearchCompaniesResponse,
  IApiSearchCompany,
  IApiSearchCompanyOfficersResponse,
  IApiSearchCompanyOfficer,
} from '../models/api';
import {
  ISearchCompaniesResponse,
  ISearchCompanyDetail,
  ISearchCompanyOfficersResponse,
  ISearchCompanyOfficer,
} from '../models/vm';

@Injectable({
  providedIn: 'root',
})
export class CompanySearchService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000/api';
  private readonly STORAGE_KEY = 'companySearchService_state';

  searchTerm = signal<string>('');
  companySearchResults = signal<ISearchCompaniesResponse | null>(null);
  companySearchError = signal<Error | null>(null);
  selectedCompany = signal<ISearchCompanyDetail | null>(null);
  selectedCompanyOfficers = signal<ISearchCompanyOfficersResponse | null>(null);
  selectedCompanyOfficersError = signal<Error | null>(null);

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        searchTerm: this.searchTerm(),
        companySearchResults: this.companySearchResults(),
        companySearchError: this.companySearchError(),
        selectedCompany: this.selectedCompany(),
        selectedCompanyOfficers: this.selectedCompanyOfficers(),
        selectedCompanyOfficersError: this.selectedCompanyOfficersError(),
      }));
    });
    try {
      const storedDataAsString = localStorage.getItem(this.STORAGE_KEY);
      if (storedDataAsString) {
        const storedData = JSON.parse(storedDataAsString);
        this.searchTerm.set(storedData.searchTerm);
        this.companySearchResults.set(storedData.companySearchResults);
        this.companySearchError.set(storedData.companySearchError);
        this.selectedCompany.set(storedData.selectedCompany);
        this.selectedCompanyOfficers.set(storedData.selectedCompanyOfficers);
        this.selectedCompanyOfficersError.set(storedData.selectedCompanyOfficersError);
      }
    } catch {
    }
  }

  searchForCompanies(searchTerm: string): Observable<ISearchCompaniesResponse> {
    const URL = `${this.BASE_URL}/Search`;
    const params = new HttpParams().set('Query', searchTerm);
    this.companySearchResults.set(null);
    this.companySearchError.set(null);
    return this.http.get<IApiSearchCompaniesResponse>(URL, { params }).pipe(
      map((data) => this.mapApiCompanySearchResultToViewModel(data)),
      tap((data) => this.companySearchResults.set(data)),
      catchError((err) => {
        this.companySearchError.set(err);
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
    this.searchTerm.set(searchTerm);
  }

  setSelectedCompany(companyNumber: string) {
    if (this.companySearchResults() !== null && this.companySearchResults()?.items) {
      const selectedCompany = this.companySearchResults()?.items.find(
        (company) => company.company_number === companyNumber
      );
      if (selectedCompany) {
        this.selectedCompany.set(selectedCompany);
      }
    }
  }

  findCompanyOfficers(
    companyNumber: string
  ): Observable<ISearchCompanyOfficersResponse> {
    const URL = `${this.BASE_URL}/Officers`;
    const params = new HttpParams().set('CompanyNumber', companyNumber);
    this.selectedCompanyOfficers.set(null);
    this.selectedCompanyOfficersError.set(null);
    return this.http
      .get<IApiSearchCompanyOfficersResponse>(URL, { params })
      .pipe(
        map((data) => this.mapApiCompanyOfficersSearchResultToViewModel(data)),
        tap((data) => this.selectedCompanyOfficers.set(data)),
        catchError((err) => {
          this.selectedCompanyOfficersError.set(err);
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
