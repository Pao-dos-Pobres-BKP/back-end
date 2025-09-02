import { NewsRepository } from "@domain/repositories/news";
import { Injectable, NotFoundException } from "@nestjs/common";
import { News } from "@domain/entities/news";

@Injectable()
export class FindNewsByIdUseCase {
  constructor(private readonly repo: NewsRepository) {}
  async execute(id: string): Promise<News> {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException("News not found");
    return item;
  }
}
