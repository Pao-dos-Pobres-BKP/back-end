import { News } from "@domain/entities/news";
import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";

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

export interface NewsRepository {
  findById(id: string): Promise<News | null>;
  findAll(
    params: PaginationParams
  ): Promise<PaginatedEntity<NewsDetailsResponse>>;
  create(params: CreateNewsParams): Promise<void>;
  update(id: string, params: UpdateNewsParams): Promise<void>;
  delete(id: string): Promise<void>;
}
