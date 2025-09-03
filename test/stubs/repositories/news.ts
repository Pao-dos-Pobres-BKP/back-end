import { NewsRepository, CreateNewsParams, UpdateNewsParams } from "@domain/repositories/news";
import { News } from "@domain/entities/news";
import { PaginationParams, PaginatedEntity } from "@domain/constants/pagination";

export const makeNewsRepositoryStub = (): jest.Mocked<NewsRepository> => {
  return {
    findById: jest.fn<Promise<News | null>, [string]>(),
    findAll: jest.fn<Promise<PaginatedEntity<News>>, [PaginationParams]>(), // 🔥 trocado para News
    create: jest.fn<Promise<void>, [CreateNewsParams]>(),
    update: jest.fn<Promise<void>, [string, UpdateNewsParams]>(),
    delete: jest.fn<Promise<void>, [string]>(),
  } as unknown as jest.Mocked<NewsRepository>;
};
