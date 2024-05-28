import { ISearchCompanyOfficer } from "./ISearchCompanyOfficer";

export interface ISearchCompanyOfficersResponse {
  items_per_page: number;
  items: ISearchCompanyOfficer[];
}
