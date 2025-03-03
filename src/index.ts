import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import postingAPIServer from "./mocks/posting-api-mock-server";
import { CompanyDB } from "./mocks/company.db";
import { Company } from "./repositories/company.model";
import { CompanyPostingsController } from './controllers/company-postings.controller';
import { CompanyPostingsService } from './services/company-postings.service';

// Start the mock Posting API server
postingAPIServer();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const companyPostingsRouter = express.Router();

const companyDB = new CompanyDB();
const companyPostingsService = new CompanyPostingsService(companyDB);
const companyPostingsController = new CompanyPostingsController(companyPostingsService);

app.use(express.json());
companyPostingsRouter.get('/company-postings', companyPostingsController.get);
companyPostingsRouter.post('/company-postings', companyPostingsController.post);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
