import { Injectable } from "@nestjs/common";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { FindAllNewsDto } from "@application/dtos/news/find-all";
import { PaginatedEntity } from "@domain/constants/pagination";
import { NewsDetailsResponse } from "@domain/repositories/news";

@Injectable()
export class FindAllNewsUseCase {
  constructor(private readonly repo: PrismaNewsRepository) {}

  async execute(
    q: FindAllNewsDto
  ): Promise<PaginatedEntity<NewsDetailsResponse>> {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 10;
    return this.repo.findAll({ page, pageSize });
  }
}
