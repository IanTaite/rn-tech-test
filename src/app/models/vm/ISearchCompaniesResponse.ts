import { ISearchCompanyDetail } from "./ISearchCompanyDetail";

export interface ISearchCompaniesResponse {
  page_number: number;
  total_results: number;
  items: ISearchCompanyDetail[];
}
