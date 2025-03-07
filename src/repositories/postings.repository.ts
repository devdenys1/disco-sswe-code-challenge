import { injectable } from 'tsyringe';
import axios from 'axios';

import { config } from '@/config';
import { IPostingsRepository } from '@/interfaces/postings.interfaces';
import { Posting } from '@/domain/postings.domain';

export interface APIPosting {
  companyId: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
}

@injectable()
export class PostingsRepository implements IPostingsRepository {
  async getPostings(): Promise<Posting[]> {
    const {
      data: { postings },
    } = await axios.get<{ postings: APIPosting[] }>(config.postingApiUrl);
    return postings.map((p) => ({
      companyId: p.companyId,
      freight: {
        weightPounds: p.freight.weightPounds,
        equipmentType: p.freight.equipmentType,
        fullPartial: p.freight.fullPartial,
        lengthFeet: p.freight.lengthFeet,
      },
    }));
  }

  async createPosting(posting: Posting): Promise<void> {
    await axios.post(config.postingApiUrl, {
      companyId: posting.companyId,
      freight: {
        weightPounds: posting.freight.weightPounds,
        equipmentType: posting.freight.equipmentType,
        fullPartial: posting.freight.fullPartial,
        lengthFeet: posting.freight.lengthFeet,
      },
    });
  }
}
