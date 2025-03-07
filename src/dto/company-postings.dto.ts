import { z } from 'zod';

export interface CompanyPostingDTO {
  companyName: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
}

export const createCompanyPostingSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  freight: z.object({
    weightPounds: z.number().positive('Weight must be positive'),
    equipmentType: z.string().min(1, 'Equipment type is required'),
    fullPartial: z.enum(['FULL', 'PARTIAL'], {
      message: 'Must be FULL or PARTIAL',
    }),
    lengthFeet: z.number().positive('Length must be positive'),
  }),
});

export type CreateCompanyPostingDTO = z.infer<
  typeof createCompanyPostingSchema
>;
