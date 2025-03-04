export interface CompanyDTO {
  id: string;
  name: string;
}

export interface ICompaniesRepository {
  getCompanies(): Promise<CompanyDTO[]>;
  getCompanyById(id: string): Promise<CompanyDTO | undefined>;
  getCompanyByName(name: string): Promise<CompanyDTO | undefined>;
}
