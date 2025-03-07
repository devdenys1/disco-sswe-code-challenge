import 'reflect-metadata';
import { container } from 'tsyringe';
import express, { Express } from 'express';

import { config } from '@/config';
import postingAPIServer from '@/mocks/posting-api-mock-server';
import { CompanyDB } from '@/mocks/company.db';
import { CompaniesRepository } from '@/repositories/companies.repository';
import { PostingsRepository } from '@/repositories/postings.repository';
import { CompanyPostingsService } from '@/services/company-postings.service';
import { CompanyPostingsController } from '@/controllers/company-postings.controller';

import { TOKENS } from './injection-tokens';

if (!config.isProduction) {
  console.log('Starting mock Posting API server');
  postingAPIServer();
}

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

const companyPostingsController = container.resolve(CompanyPostingsController);

const app: Express = express();
const port = config.port;
const companyPostingsRouter = express.Router();

app.use(express.json());

companyPostingsRouter.get(
  '/company-postings',
  companyPostingsController.get.bind(companyPostingsController)
);

companyPostingsRouter.post(
  '/company-postings',
  companyPostingsController.post.bind(companyPostingsController)
);

app.use('/api', companyPostingsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
