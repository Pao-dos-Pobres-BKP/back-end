import { News } from "@domain/entities/news";
import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";

/** types permanecem iguais */
export type CreateNewsParams = {
  title: string;
  description: string;
  date?: Date | null;
  location?: string | null;
  url?: string | null;
};

export type UpdateNewsParams = Partial<CreateNewsParams>;

export type NewsDetailsResponse = {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  location: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export abstract class NewsRepository {
  abstract findById(id: string): Promise<News | null>;
  abstract findAll(
    params: PaginationParams
  ): Promise<PaginatedEntity<NewsDetailsResponse>>;
  abstract create(params: CreateNewsParams): Promise<void>;
  abstract update(id: string, params: UpdateNewsParams): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
