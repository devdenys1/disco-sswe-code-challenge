import { injectable, inject } from 'tsyringe';

import { ICompaniesRepository } from '@/types/companies.types';
import { CompanyDB } from '@/mocks/company.db';
import { CompanyDTO } from '@/types/companies.types';

import { Company } from './company.model';

@injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(@inject('CompanyDB') private companyDB: CompanyDB) {}

  private mapToDTO(model: Company): CompanyDTO {
    return {
      id: model.id,
      name: model.name,
    };
  }

  async getCompanies(): Promise<CompanyDTO[]> {
    const companiesCollection = this.companyDB.getCompanyCollection();
    const companies = companiesCollection.find();
    return companies.map((company) => this.mapToDTO(company));
  }

  async getCompanyById(id: string): Promise<CompanyDTO | undefined> {
    const company = this.companyDB.getCompanyById(id);
    if (!company) {
      return undefined;
    }
    return this.mapToDTO(company);
  }

  async getCompanyByName(name: string): Promise<CompanyDTO | undefined> {
    const companiesCollection = this.companyDB.getCompanyCollection();
    const company = companiesCollection.findOne({ name });
    return company ? this.mapToDTO(company) : undefined;
  }
}
