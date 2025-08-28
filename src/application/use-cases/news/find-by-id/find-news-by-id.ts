import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { FindNewsByIdDto } from "@application/dtos/news/find-by-id";
import { News } from "@domain/entities/news";

@Injectable()
export class FindNewsByIdUseCase {
  constructor(private readonly repo: PrismaNewsRepository) {}

  async execute({ id }: FindNewsByIdDto): Promise<News> {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException("News not found");
    return item;
  }
}
