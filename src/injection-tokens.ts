import { InjectionToken } from 'tsyringe';

import { ICompaniesRepository } from '@/interfaces/companies.interfaces';
import { ICompanyPostingsService } from '@/interfaces/company-postings.interfaces';
import { IPostingsRepository } from '@/interfaces/postings.interfaces';
import { CompanyDB } from '@/mocks/company.db';

export const TOKENS = {
  CompanyDB: Symbol('CompanyDB') as InjectionToken<CompanyDB>,

  ICompaniesRepository: Symbol(
    'ICompaniesRepository'
  ) as InjectionToken<ICompaniesRepository>,

  IPostingsRepository: Symbol(
    'IPostingsRepository'
  ) as InjectionToken<IPostingsRepository>,

  ICompanyPostingsService: Symbol(
    'ICompanyPostingsService'
  ) as InjectionToken<ICompanyPostingsService>,
} as const;
