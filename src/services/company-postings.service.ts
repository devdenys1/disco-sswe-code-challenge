import { injectable, inject } from 'tsyringe';
import axios from 'axios';

import {
  ICompanyPostingsService,
  CompanyPostingDTO,
  GetCompanyPostingsDTO,
  CreateCompanyPostingDTO,
  PostingDTO,
} from '@/types/company-postings.types';
import { ICompaniesRepository } from '@/types/companies.types';

@injectable()
export class CompanyPostingsService implements ICompanyPostingsService {
  constructor(
    @inject('ICompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async getPostings(data: GetCompanyPostingsDTO): Promise<CompanyPostingDTO[]> {
    const {
      data: { postings },
    } = await axios.get<{ postings: PostingDTO[] }>('/postings');

    const filtered = postings.filter((posting) => {
      const matchesEquipment =
        !data.filters.equipmentType ||
        posting.freight.equipmentType === data.filters.equipmentType;

      const matchesFullPartial =
        !data.filters.fullPartial ||
        posting.freight.fullPartial === data.filters.fullPartial;

      return matchesEquipment && matchesFullPartial;
    });

    return Promise.all(
      filtered.map(async (posting) => {
        const company = await this.companiesRepository.getCompanyById(
          posting.companyId
        );

        return {
          companyName: company?.name ?? 'N/A',
          freight: posting.freight,
        };
      })
    );
  }

  async createPosting(data: CreateCompanyPostingDTO): Promise<void> {
    const company = await this.companiesRepository.getCompanyByName(
      data.companyName
    );

    if (!company) {
      throw new Error(`Company not found: ${data.companyName}`);
    }

    const postingData: Partial<PostingDTO> = {
      companyId: company.id,
      freight: data.freight,
    };

    await axios.post('/posting', postingData);
  }
}
