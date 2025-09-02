import { Injectable } from "@nestjs/common";
import { FindAllNewsDto } from "@application/dtos/news/find-all";
import { NewsRepository, NewsDetailsResponse } from "@domain/repositories/news";
import { PaginatedEntity } from "@domain/constants/pagination";

@Injectable()
export class FindAllNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(
    q: FindAllNewsDto
  ): Promise<PaginatedEntity<NewsDetailsResponse>> {
    const { page = 1, pageSize = 10 } = q;
    const result = await this.repo.findAll({ page, pageSize });
    return result;
  }
}
