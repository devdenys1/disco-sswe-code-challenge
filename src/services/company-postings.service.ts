import { injectable, inject } from 'tsyringe';

import { TOKENS } from '@/injection-tokens';
import {
  CompanyPosting,
  CompanyPostingFilters,
  CompanyPostingCreateInput,
} from '@/domain/company-postings.domain';
import { PostingCreateInput } from '@/domain/postings.domain';
import { ICompanyPostingsService } from '@/interfaces/company-postings.interfaces';
import { ICompaniesRepository } from '@/interfaces/companies.interfaces';
import { IPostingsRepository } from '@/interfaces/postings.interfaces';

import { NotFoundError } from './company-postings.errors';

@injectable()
export class CompanyPostingsService implements ICompanyPostingsService {
  constructor(
    @inject(TOKENS.ICompaniesRepository)
    private companiesRepository: ICompaniesRepository,
    @inject(TOKENS.IPostingsRepository)
    private postingsRepository: IPostingsRepository
  ) {}

  async getPostings(filters: CompanyPostingFilters): Promise<CompanyPosting[]> {
    const postings = await this.postingsRepository.getPostings();

    const filtered = postings.filter((posting) => {
      const matchesEquipment =
        !filters.equipmentType ||
        posting.freight.equipmentType === filters.equipmentType;

      const matchesFullPartial =
        !filters.fullPartial ||
        posting.freight.fullPartial === filters.fullPartial;

      return matchesEquipment && matchesFullPartial;
    });

    return Promise.all(
      filtered.map(async (posting) => {
        const company = await this.companiesRepository.getCompanyById(
          posting.companyId
        );

        return {
          companyName: company?.name ?? 'N/A',
          freight: {
            weightPounds: posting.freight.weightPounds,
            equipmentType: posting.freight.equipmentType,
            fullPartial: posting.freight.fullPartial,
            lengthFeet: posting.freight.lengthFeet,
          },
        };
      })
    );
  }

  async createPosting(data: CompanyPostingCreateInput): Promise<void> {
    const company = await this.companiesRepository.getCompanyByName(
      data.companyName
    );

    if (!company) {
      throw new NotFoundError(`Company not found: ${data.companyName}`);
    }

    const postingCreateInput: PostingCreateInput = {
      companyId: company.id,
      freight: {
        weightPounds: data.freight.weightPounds,
        equipmentType: data.freight.equipmentType,
        fullPartial: data.freight.fullPartial,
        lengthFeet: data.freight.lengthFeet,
      },
    };

    await this.postingsRepository.createPosting(postingCreateInput);
  }
}
