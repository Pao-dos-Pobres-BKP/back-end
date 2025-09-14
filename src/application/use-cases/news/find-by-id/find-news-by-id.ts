import { Injectable } from "@nestjs/common";
import { NewsRepository } from "@domain/repositories/news";
import { News } from "@domain/entities/news";
import { ExceptionsAdapter } from "@domain/adapters/exception";

@Injectable()
export class FindNewsByIdUseCase {
  constructor(
    private readonly repo: NewsRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(id: string): Promise<News> {
    const item = await this.repo.findById(id);

    if (!item) {
      this.exceptions.notFound({ message: "News not found" });
    }

    return item;
  }
}
