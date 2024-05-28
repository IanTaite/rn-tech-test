export interface IApiSearchCompanyOfficer {
  name: string;
  apointed_on: string;
  officer_role: string;
  date_of_birth: {
    month: number;
    year: number;
  }
  occupation: string;
  country_of_residence: string;
  nationality: string;
}
