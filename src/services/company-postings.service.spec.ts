import { container } from 'tsyringe';

import { CompanyPostingsService } from '@/services/company-postings.service';
import { ICompaniesRepository } from '@/interfaces/companies.interfaces';
import { IPostingsRepository } from '@/interfaces/postings.interfaces';
import { TOKENS } from '@/injection-tokens';
import { Posting } from '@/domain/postings.domain';
import {
  CompanyPosting,
  CompanyPostingCreateInput,
} from '@/domain/company-postings.domain';

describe('CompanyPostingsService', () => {
  let service: CompanyPostingsService;
  let mockCompaniesRepo: jest.Mocked<ICompaniesRepository>;
  let mockPostingsRepo: jest.Mocked<IPostingsRepository>;

  const mockPostings: Posting[] = [
    {
      companyId: '1',
      freight: {
        weightPounds: 100,
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 20,
      },
    },
    {
      companyId: '2',
      freight: {
        weightPounds: 200,
        equipmentType: 'Dry',
        fullPartial: 'PARTIAL',
        lengthFeet: 30,
      },
    },
  ];

  beforeEach(() => {
    container.clearInstances();

    mockCompaniesRepo = {
      getCompanyById: jest.fn(),
      getCompanyByName: jest.fn(),
      getCompanies: jest.fn(),
      getCompanyNameById: jest.fn(),
    } as jest.Mocked<ICompaniesRepository>;

    mockPostingsRepo = {
      getPostings: jest.fn(),
      createPosting: jest.fn(),
    } as jest.Mocked<IPostingsRepository>;

    container.register(TOKENS.ICompaniesRepository, {
      useValue: mockCompaniesRepo,
    });
    container.register(TOKENS.IPostingsRepository, {
      useValue: mockPostingsRepo,
    });

    service = container.resolve(CompanyPostingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostings', () => {
    it('should return filtered postings with company names', async () => {
      mockPostingsRepo.getPostings.mockResolvedValue(mockPostings);
      mockCompaniesRepo.getCompanyById.mockResolvedValueOnce({
        id: '1',
        name: 'ACCELERATE SHIPPING',
      });

      const result = await service.getPostings({ equipmentType: 'Reefer' });

      expect(mockPostingsRepo.getPostings).toHaveBeenCalled();
      expect(result).toEqual([
        {
          companyName: 'ACCELERATE SHIPPING',
          freight: mockPostings[0].freight,
        },
      ] satisfies CompanyPosting[]);
      expect(mockCompaniesRepo.getCompanyById).toHaveBeenCalledWith('1');
    });

    it('should handle empty filters', async () => {
      mockPostingsRepo.getPostings.mockResolvedValue(mockPostings);
      mockCompaniesRepo.getCompanyById
        .mockResolvedValueOnce({ id: '1', name: 'ACCELERATE SHIPPING' })
        .mockResolvedValueOnce({ id: '2', name: 'BARTER SHIPPING' });

      const result = await service.getPostings({});

      expect(mockPostingsRepo.getPostings).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          companyName: 'ACCELERATE SHIPPING',
          freight: mockPostings[0].freight,
        },
        {
          companyName: 'BARTER SHIPPING',
          freight: mockPostings[1].freight,
        },
      ] satisfies CompanyPosting[]);
    });

    it('should use N/A for missing company', async () => {
      mockPostingsRepo.getPostings.mockResolvedValue([mockPostings[0]]);
      mockCompaniesRepo.getCompanyById.mockResolvedValueOnce(undefined);

      const result = await service.getPostings({});

      expect(mockPostingsRepo.getPostings).toHaveBeenCalled();
      expect(result).toEqual([
        {
          companyName: 'N/A',
          freight: mockPostings[0].freight,
        },
      ] satisfies CompanyPosting[]);
    });
  });

  describe('createPosting', () => {
    it('should create a posting with valid company', async () => {
      mockCompaniesRepo.getCompanyByName.mockResolvedValue({
        id: '1',
        name: 'ACCELERATE SHIPPING',
      });
      mockPostingsRepo.createPosting.mockResolvedValue(undefined);

      const data: CompanyPostingCreateInput = {
        companyName: 'ACCELERATE SHIPPING',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };

      await expect(service.createPosting(data)).resolves.toBeUndefined();
      expect(mockCompaniesRepo.getCompanyByName).toHaveBeenCalledWith(
        'ACCELERATE SHIPPING'
      );
      expect(mockPostingsRepo.createPosting).toHaveBeenCalledWith({
        companyId: '1',
        freight: data.freight,
      } satisfies Posting);
    });

    it('should throw error for non-existent company', async () => {
      mockCompaniesRepo.getCompanyByName.mockResolvedValue(undefined);

      const data: CompanyPostingCreateInput = {
        companyName: 'NONEXISTENT',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };

      await expect(service.createPosting(data)).rejects.toThrow(
        'Company not found: NONEXISTENT'
      );
      expect(mockCompaniesRepo.getCompanyByName).toHaveBeenCalledWith(
        'NONEXISTENT'
      );
      expect(mockPostingsRepo.createPosting).not.toHaveBeenCalled();
    });
  });
});
