import { injectable, inject } from 'tsyringe';

import { CompanyDB } from '@/mocks/company.db';
import { TOKENS } from '@/injection-tokens';
import { Company } from '@/domain/companies.domain';
import { ICompaniesRepository } from '@/interfaces/companies.interfaces';

import { CompanyModel } from './company.model';

@injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(@inject(TOKENS.CompanyDB) private companyDB: CompanyDB) {}

  private mapToDomain(model: CompanyModel): Company {
    return {
      id: model.id,
      name: model.name,
    };
  }

  async getCompanies(): Promise<Company[]> {
    const companiesCollection = this.companyDB.getCompanyCollection();
    const companies = companiesCollection.find();
    return companies.map((company) => this.mapToDomain(company));
  }

  async getCompanyById(id: string): Promise<Company | undefined> {
    const company = this.companyDB.getCompanyById(id);
    if (!company) {
      return undefined;
    }
    return this.mapToDomain(company);
  }

  async getCompanyByName(name: string): Promise<Company | undefined> {
    const companiesCollection = this.companyDB.getCompanyCollection();
    const company = companiesCollection.findOne({ name });
    return company ? this.mapToDomain(company) : undefined;
  }
}
