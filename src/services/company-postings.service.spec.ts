import { container } from 'tsyringe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CompanyPostingsService } from '@/services/company-postings.service';
import { ICompaniesRepository } from '@/types/companies.types';
import { PostingDTO } from '@/types/company-postings.types';

describe('CompanyPostingsService', () => {
  let service: CompanyPostingsService;
  let mockAxios: MockAdapter;
  let mockCompaniesRepo: jest.Mocked<ICompaniesRepository>;

  const mockPostings: PostingDTO[] = [
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
    mockAxios = new MockAdapter(axios);
    mockCompaniesRepo = {
      getCompanyById: jest.fn(),
      getCompanyByName: jest.fn(),
      getCompanies: jest.fn(),
      getCompanyNameById: jest.fn(),
    } as jest.Mocked<ICompaniesRepository>;

    container.register('ICompaniesRepository', { useValue: mockCompaniesRepo });
    service = container.resolve(CompanyPostingsService);
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  describe('getPostings', () => {
    it('should return filtered postings with company names', async () => {
      mockAxios.onGet('/postings').reply(200, { postings: mockPostings });
      mockCompaniesRepo.getCompanyById
        .mockResolvedValueOnce({ id: '1', name: 'ACCELERATE SHIPPING' })
        .mockResolvedValueOnce({ id: '2', name: 'BARTER SHIPPING' });

      const result = await service.getPostings({
        filters: { equipmentType: 'Reefer' },
      });

      expect(result).toEqual([
        {
          companyName: 'ACCELERATE SHIPPING',
          freight: mockPostings[0].freight,
        },
      ]);
      expect(mockCompaniesRepo.getCompanyById).toHaveBeenCalledWith('1');
    });

    it('should handle empty filters', async () => {
      mockAxios.onGet('/postings').reply(200, { postings: mockPostings });
      mockCompaniesRepo.getCompanyById
        .mockResolvedValueOnce({ id: '1', name: 'ACCELERATE SHIPPING' })
        .mockResolvedValueOnce({ id: '2', name: 'BARTER SHIPPING' });

      const result = await service.getPostings({ filters: {} });

      expect(result).toHaveLength(2);
      expect(result[0].companyName).toBe('ACCELERATE SHIPPING');
      expect(result[1].companyName).toBe('BARTER SHIPPING');
    });

    it('should use N/A for missing company', async () => {
      mockAxios.onGet('/postings').reply(200, { postings: [mockPostings[0]] });
      mockCompaniesRepo.getCompanyById.mockResolvedValueOnce(undefined);

      const result = await service.getPostings({ filters: {} });

      expect(result[0].companyName).toBe('N/A');
    });
  });

  describe('createPosting', () => {
    it('should create a posting with valid company', async () => {
      mockCompaniesRepo.getCompanyByName.mockResolvedValue({
        id: '1',
        name: 'ACCELERATE SHIPPING',
      });
      mockAxios.onPost('/posting').reply(200);

      const data = {
        companyName: 'ACCELERATE SHIPPING',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };

      await expect(service.createPosting(data)).resolves.toBeUndefined();
      expect(mockAxios.history.post[0].data).toBe(
        JSON.stringify({ companyId: '1', freight: data.freight })
      );
    });

    it('should throw error for non-existent company', async () => {
      mockCompaniesRepo.getCompanyByName.mockResolvedValue(undefined);

      const data = {
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
    });
  });
});
