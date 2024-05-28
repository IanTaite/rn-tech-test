import { IApiSearchCompanyOfficer } from "./IApiSearchCompanyOfficer";

export interface IApiSearchCompanyOfficersResponse {
  etag: string;
  kind: string;
  items_per_page: number;
  items: IApiSearchCompanyOfficer[];
}
