import { Posting, PostingCreateInput } from '@/domain/postings.domain';

export interface IPostingsRepository {
  getPostings(): Promise<Posting[]>;
  createPosting(posting: PostingCreateInput): Promise<void>;
}
