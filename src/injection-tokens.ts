import { InjectionToken } from 'tsyringe';

import { ICompaniesRepository } from '@/types/companies.types';
import { ICompanyPostingsService } from '@/types/company-postings.types';
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
