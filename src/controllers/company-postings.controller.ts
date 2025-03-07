import { injectable, inject } from 'tsyringe';
import { z } from 'zod';
import { Request, Response } from 'express';

import {
  CreateCompanyPostingDTO,
  createCompanyPostingSchema,
} from '@/dto/company-postings.dto';
import {
  CompanyPostingCreateInput,
  CompanyPostingFilters,
} from '@/domain/company-postings.domain';
import { ICompanyPostingsService } from '@/interfaces/company-postings.interfaces';
import { NotFoundError } from '@/services/company-postings.errors';
import { TOKENS } from '@/injection-tokens';

@injectable()
export class CompanyPostingsController {
  constructor(
    @inject(TOKENS.ICompanyPostingsService)
    private companyPostingsService: ICompanyPostingsService
  ) {}

  async get(req: Request, res: Response): Promise<void> {
    try {
      const filters: CompanyPostingFilters = {
        equipmentType: req.query.equipmentType as string | undefined,
        fullPartial: req.query.fullPartial as string | undefined,
      };
      const postings = await this.companyPostingsService.getPostings(filters);
      res.status(200).json(postings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateCompanyPostingDTO = createCompanyPostingSchema.parse(
        req.body
      );

      const companyPostingCreateInput: CompanyPostingCreateInput = {
        companyName: data.companyName,
        freight: {
          weightPounds: data.freight.weightPounds,
          equipmentType: data.freight.equipmentType,
          fullPartial: data.freight.fullPartial,
          lengthFeet: data.freight.lengthFeet,
        },
      };

      await this.companyPostingsService.createPosting(
        companyPostingCreateInput
      );
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
