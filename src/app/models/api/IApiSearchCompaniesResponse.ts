import { IApiSearchCompany } from './IApiSearchCompany';

export interface IApiSearchCompaniesResponse {
  page_number: number;
  kind: string;
  total_results?: number;
  items?: IApiSearchCompany[];
}
