import dotenv from 'dotenv';

dotenv.config();

export const config = {
  postingApiUrl: process.env.POSTING_API_URL || '/postings',
  isProduction: process.env.NODE_ENV === 'production',
};
