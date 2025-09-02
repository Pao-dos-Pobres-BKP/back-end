import { Injectable } from "@nestjs/common";
import { UpdateNewsDto } from "@application/dtos/news/update";
import { NewsRepository } from "@domain/repositories/news";

@Injectable()
export class UpdateNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(id: string, dto: UpdateNewsDto): Promise<void> {
    await this.repo.update(id, {
      title: dto.title,
      description: dto.description,
      date: dto.date ? new Date(dto.date) : null,
      location: dto.location ?? null,
      url: dto.url ?? null
    });
  }
}
