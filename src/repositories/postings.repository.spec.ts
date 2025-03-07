import { container } from 'tsyringe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  PostingsRepository,
  APIPosting,
} from '@/repositories/postings.repository';
import { IPostingsRepository } from '@/interfaces/postings.interfaces';
import { Posting } from '@/domain/postings.domain';
import { config } from '@/config';

describe('PostingsRepository', () => {
  let repository: IPostingsRepository;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    repository = container.resolve(PostingsRepository);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe('getPostings', () => {
    it('should fetch and map postings from API to domain model', async () => {
      const apiPostings: APIPosting[] = [
        {
          companyId: '1',
          freight: {
            weightPounds: 100,
            equipmentType: 'Reefer',
            fullPartial: 'FULL',
            lengthFeet: 20,
          },
        },
        {
          companyId: '2',
          freight: {
            weightPounds: 200,
            equipmentType: 'DryVan',
            fullPartial: 'PARTIAL',
            lengthFeet: 30,
          },
        },
      ];

      mockAxios
        .onGet(config.postingApiUrl)
        .reply(200, { postings: apiPostings });

      const result = await repository.getPostings();

      expect(result).toEqual([
        {
          companyId: '1',
          freight: {
            weightPounds: 100,
            equipmentType: 'Reefer',
            fullPartial: 'FULL',
            lengthFeet: 20,
          },
        },
        {
          companyId: '2',
          freight: {
            weightPounds: 200,
            equipmentType: 'DryVan',
            fullPartial: 'PARTIAL',
            lengthFeet: 30,
          },
        },
      ] satisfies Posting[]);
    });

    it('should return empty array if API returns no postings', async () => {
      mockAxios.onGet(config.postingApiUrl).reply(200, { postings: [] });

      const result = await repository.getPostings();

      expect(result).toEqual([]);
    });

    it('should throw error if API call fails', async () => {
      mockAxios.onGet(config.postingApiUrl).networkError();

      await expect(repository.getPostings()).rejects.toThrow('Network Error');
    });
  });

  describe('createPosting', () => {
    it('should send posting to API with correct mapping', async () => {
      const posting: Posting = {
        companyId: '1',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };
      mockAxios.onPost(config.postingApiUrl).reply(201);

      await repository.createPosting(posting);

      expect(mockAxios.history.post).toHaveLength(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
        companyId: '1',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      });
    });

    it('should throw error if API call fails', async () => {
      const posting: Posting = {
        companyId: '1',
        freight: {
          weightPounds: 100,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 20,
        },
      };
      mockAxios
        .onPost(config.postingApiUrl)
        .reply(500, { error: 'Server error' });

      await expect(repository.createPosting(posting)).rejects.toThrow();
    });
  });
});
