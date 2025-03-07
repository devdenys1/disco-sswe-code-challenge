import { injectable, inject } from 'tsyringe';
import { z } from 'zod';
import { Request, Response } from 'express';

import {
  ICompanyPostingsService,
  GetCompanyPostingsDTO,
  CreateCompanyPostingDTO,
  createCompanyPostingSchema,
} from '@/types/company-postings.types';
import { NotFoundError } from '@/services/company-postings.errors';
import { TOKENS } from '@/injection-tokens';

@injectable()
export class CompanyPostingsController {
  constructor(
    @inject(TOKENS.ICompanyPostingsService)
    private service: ICompanyPostingsService
  ) {}

  async get(req: Request, res: Response): Promise<void> {
    try {
      const filters: GetCompanyPostingsDTO = {
        filters: {
          equipmentType: req.query.equipmentType as string | undefined,
          fullPartial: req.query.fullPartial as string | undefined,
        },
      };
      const postings = await this.service.getPostings(filters);
      res.status(200).json(postings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    try {
      const data = createCompanyPostingSchema.parse(
        req.body
      ) as CreateCompanyPostingDTO;
      await this.service.createPosting(data);
      res.status(201).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: 'Validation failed', details: error.errors });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
