import { container } from 'tsyringe';
import { mock } from 'jest-mock-extended';

import { CompanyPostingsController } from '@/controllers/company-postings.controller';
import { ICompanyPostingsService } from '@/types/company-postings.types';
import { NotFoundError } from '@/services/company-postings.errors';

describe('CompanyPostingsController', () => {
  let controller: CompanyPostingsController;
  let mockService: jest.Mocked<ICompanyPostingsService>;

  const mockPostings = [
    {
      companyName: 'ACCELERATE SHIPPING',
      freight: {
        weightPounds: 100,
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 20,
      },
    },
  ];

  beforeEach(() => {
    container.clearInstances();
    mockService = mock<ICompanyPostingsService>();
    container.register('ICompanyPostingsService', { useValue: mockService });
    controller = container.resolve(CompanyPostingsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return postings on success', async () => {
      mockService.getPostings.mockResolvedValue(mockPostings);
      const req = { query: { equipmentType: 'Reefer' } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.get(req, res);

      expect(mockService.getPostings).toHaveBeenCalledWith({
        filters: { equipmentType: 'Reefer', fullPartial: undefined },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPostings);
    });

    it('should return 500 on service error', async () => {
      mockService.getPostings.mockRejectedValue(new Error('Service failure'));
      const req = { query: {} } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.get(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service failure' });
    });
  });

  describe('post', () => {
    it('should create posting and return 201 on success', async () => {
      const validData = {
        companyName: 'ACCELERATE SHIPPING',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };
      mockService.createPosting.mockResolvedValue();
      const req = { body: validData } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.post(req, res);

      expect(mockService.createPosting).toHaveBeenCalledWith(validData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 400 on validation error', async () => {
      const invalidData = { companyName: '', freight: {} };
      const req = { body: invalidData } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.post(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Validation failed' })
      );
    });

    it('should return 404 on NotFoundError', async () => {
      const data = {
        companyName: 'NONEXISTENT',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };
      mockService.createPosting.mockRejectedValue(
        new NotFoundError('Company not found: NONEXISTENT')
      );
      const req = { body: data } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.post(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Company not found: NONEXISTENT',
      });
    });

    it('should return 500 on unexpected error', async () => {
      const data = {
        companyName: 'ACCELERATE SHIPPING',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };
      mockService.createPosting.mockRejectedValue(
        new Error('Unexpected error')
      );
      const req = { body: data } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.post(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
