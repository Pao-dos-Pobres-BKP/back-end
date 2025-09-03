import { Injectable } from "@nestjs/common";
import { FindAllNewsDto } from "@application/dtos/news/find-all";
import { NewsRepository } from "@domain/repositories/news";
import { PaginatedEntity } from "@domain/constants/pagination";
import { News } from "@domain/entities/news";

@Injectable()
export class FindAllNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(params: FindAllNewsDto): Promise<PaginatedEntity<News>> {
    const { page = 1, pageSize = 10 } = params;
    return this.repo.findAll({ page, pageSize });
  }
}
