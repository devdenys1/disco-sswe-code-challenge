import {
  CompanyPosting,
  CompanyPostingFilters,
  CompanyPostingCreateInput,
} from '@/domain/company-postings.domain';

export interface ICompanyPostingsService {
  getPostings(data: CompanyPostingFilters): Promise<CompanyPosting[]>;
  createPosting(data: CompanyPostingCreateInput): Promise<void>;
}
