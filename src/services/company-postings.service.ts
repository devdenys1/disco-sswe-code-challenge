import { injectable, inject } from 'tsyringe';
import axios from 'axios';

import { config } from '@/config';
import { TOKENS } from '@/injection-tokens';
import {
  CompanyPosting,
  CompanyPostingFilters,
  CompanyPostingCreateInput,
} from '@/domain/company-postings.domain';
import { Posting } from '@/domain/postings.domain';
import { ICompanyPostingsService } from '@/interfaces/company-postings.interfaces';
import { ICompaniesRepository } from '@/interfaces/companies.interfaces';

import { NotFoundError } from './company-postings.errors';

@injectable()
export class CompanyPostingsService implements ICompanyPostingsService {
  constructor(
    @inject(TOKENS.ICompaniesRepository)
    private companiesRepository: ICompaniesRepository
  ) {}

  async getPostings(filters: CompanyPostingFilters): Promise<CompanyPosting[]> {
    const {
      data: { postings },
    } = await axios.get<{ postings: Posting[] }>(config.postingApiUrl);

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

    const postingData: Posting = {
      companyId: company.id,
      freight: data.freight,
    };

    await axios.post(config.postingApiUrl, postingData);
  }
}
