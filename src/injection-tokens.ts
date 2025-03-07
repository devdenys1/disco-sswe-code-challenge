import { InjectionToken } from 'tsyringe';

import { ICompaniesRepository } from '@/interfaces/companies.interfaces';
import { ICompanyPostingsService } from '@/interfaces/company-postings.interfaces';
import { CompanyDB } from '@/mocks/company.db';

export const TOKENS = {
  CompanyDB: Symbol('CompanyDB') as InjectionToken<CompanyDB>,

  ICompaniesRepository: Symbol(
    'ICompaniesRepository'
  ) as InjectionToken<ICompaniesRepository>,

  ICompanyPostingsService: Symbol(
    'ICompanyPostingsService'
  ) as InjectionToken<ICompanyPostingsService>,
} as const;
