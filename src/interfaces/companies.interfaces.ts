import { Company } from '@/domain/companies.domain';

export interface ICompaniesRepository {
  getCompanies(): Promise<Company[]>;
  getCompanyById(id: string): Promise<Company | undefined>;
  getCompanyByName(name: string): Promise<Company | undefined>;
}
