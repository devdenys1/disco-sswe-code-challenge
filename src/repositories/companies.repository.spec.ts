import { container } from 'tsyringe';

import { CompaniesRepository } from '@/repositories/companies.repository';
import { CompanyDB } from '@/mocks/company.db';
import { Company } from '@/repositories/company.model';

describe('CompaniesRepository', () => {
  let repository: CompaniesRepository;
  let mockCompanyDB: jest.Mocked<CompanyDB>;

  const mockCompanies: Company[] = [
    { id: '1', name: 'ACCELERATE SHIPPING' },
    { id: '2', name: 'BARTER SHIPPING' },
  ];

  beforeEach(() => {
    container.clearInstances();

    mockCompanyDB = {
      getCompanyCollection: jest.fn(),
      getCompanyById: jest.fn(),
    } as unknown as jest.Mocked<CompanyDB>;

    container.register('CompanyDB', { useValue: mockCompanyDB });

    repository = container.resolve(CompaniesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCompanies', () => {
    it('should return an array of CompanyDTOs when companies exist', async () => {
      const mockCollection = {
        find: jest.fn().mockReturnValue(mockCompanies),
      };
      mockCompanyDB.getCompanyCollection.mockReturnValue(mockCollection as any);

      const result = await repository.getCompanies();

      expect(result).toEqual([
        { id: '1', name: 'ACCELERATE SHIPPING' },
        { id: '2', name: 'BARTER SHIPPING' },
      ]);
      expect(mockCompanyDB.getCompanyCollection).toHaveBeenCalledTimes(1);
      expect(mockCollection.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no companies exist', async () => {
      const mockCollection = {
        find: jest.fn().mockReturnValue([]),
      };
      mockCompanyDB.getCompanyCollection.mockReturnValue(mockCollection as any);

      const result = await repository.getCompanies();

      expect(result).toEqual([]);
      expect(mockCompanyDB.getCompanyCollection).toHaveBeenCalledTimes(1);
      expect(mockCollection.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCompanyById', () => {
    it('should return a CompanyDTO for a valid company ID', async () => {
      const mockCompany: Company = { id: '1', name: 'ACCELERATE SHIPPING' };
      mockCompanyDB.getCompanyById.mockReturnValue(mockCompany);

      const result = await repository.getCompanyById('1');

      expect(result).toEqual({ id: '1', name: 'ACCELERATE SHIPPING' });
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledWith('1');
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledTimes(1);
    });

    it('should return undefined for a non-existent company ID', async () => {
      mockCompanyDB.getCompanyById.mockReturnValue(undefined);

      const result = await repository.getCompanyById('999');

      expect(result).toBeUndefined();
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledWith('999');
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledTimes(1);
    });

    it('should handle invalid ID gracefully', async () => {
      mockCompanyDB.getCompanyById.mockReturnValue(undefined);

      const result = await repository.getCompanyById('');

      expect(result).toBeUndefined();
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledWith('');
      expect(mockCompanyDB.getCompanyById).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCompanyByName', () => {
    it('should return a CompanyDTO for a valid company name', async () => {
      const mockCollection = {
        findOne: jest.fn().mockReturnValue(mockCompanies[0]),
      };
      mockCompanyDB.getCompanyCollection.mockReturnValue(mockCollection as any);
      const result = await repository.getCompanyByName('ACCELERATE SHIPPING');
      expect(result).toEqual({ id: '1', name: 'ACCELERATE SHIPPING' });
      expect(mockCollection.findOne).toHaveBeenCalledWith({
        name: 'ACCELERATE SHIPPING',
      });
    });

    it('should return undefined for a non-existent company name', async () => {
      const mockCollection = {
        findOne: jest.fn().mockReturnValue(null),
      };
      mockCompanyDB.getCompanyCollection.mockReturnValue(mockCollection as any);
      const result = await repository.getCompanyByName('NONEXISTENT');
      expect(result).toBeUndefined();
      expect(mockCollection.findOne).toHaveBeenCalledWith({
        name: 'NONEXISTENT',
      });
    });
  });
});
