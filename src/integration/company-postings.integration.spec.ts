import supertest from 'supertest';
import { container } from 'tsyringe';
import express from 'express';

import { CompanyPostingsController } from '@/controllers/company-postings.controller';
import { CompanyPostingsService } from '@/services/company-postings.service';
import { CompaniesRepository } from '@/repositories/companies.repository';
import { PostingsRepository } from '@/repositories/postings.repository';
import { CompanyDB } from '@/mocks/company.db';
import postingAPIServer from '@/mocks/posting-api-mock-server';
import { TOKENS } from '@/injection-tokens';

describe('CompanyPostings API Integration', () => {
  let app: express.Express;
  let request: ReturnType<typeof supertest>;

  beforeAll(async () => {
    postingAPIServer();

    container.register(TOKENS.CompanyDB, { useClass: CompanyDB });
    container.register(TOKENS.ICompaniesRepository, {
      useClass: CompaniesRepository,
    });
    container.register(TOKENS.IPostingsRepository, {
      useClass: PostingsRepository,
    });
    container.register(TOKENS.ICompanyPostingsService, {
      useClass: CompanyPostingsService,
    });

    const controller = container.resolve(CompanyPostingsController);
    app = express();
    app.use(express.json());
    const router = express.Router();
    router.get('/company-postings', controller.get.bind(controller));
    router.post('/company-postings', controller.post.bind(controller));
    app.use('/api', router);

    request = supertest(app);

    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterAll(() => {
    container.clearInstances();
  });

  describe('GET /api/company-postings', () => {
    it('should return filtered postings with valid query', async () => {
      const res = await request
        .get('/api/company-postings')
        .query({ equipmentType: 'Reefer' });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(
        res.body.every((item: any) => item.freight.equipmentType === 'Reefer')
      ).toBe(true);
    });

    it('should return all postings with no filters', async () => {
      const res = await request.get('/api/company-postings');

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/company-postings', () => {
    const validPosting = {
      companyName: 'ACCELERATE SHIPPING',
      freight: {
        weightPounds: 100,
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 20,
      },
    };

    it('should create posting and return 201 with valid data', async () => {
      const res = await request
        .post('/api/company-postings')
        .send(validPosting);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({});
    });

    it('should return 400 with invalid data', async () => {
      const invalidData = {
        companyName: '',
        freight: {
          weightPounds: -1,
          equipmentType: '',
          fullPartial: 'INVALID',
          lengthFeet: -5,
        },
      };
      const res = await request.post('/api/company-postings').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: 'Validation failed',
          details: expect.any(Array),
        })
      );
    });

    it('should return 404 with unknown company', async () => {
      const data = { ...validPosting, companyName: 'NONEXISTENT' };
      const res = await request.post('/api/company-postings').send(data);

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.stringMatching(/Company not found: NONEXISTENT/),
        })
      );
    });

    it('should return 400 with missing required fields', async () => {
      const res = await request
        .post('/api/company-postings')
        .send({ companyName: 'ACCELERATE SHIPPING' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });
});
