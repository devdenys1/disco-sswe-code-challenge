import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  postingApiUrl: process.env.POSTING_API_URL || '/postings',
  isProduction: process.env.NODE_ENV === 'production',
};
