import { Injectable } from "@nestjs/common";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { CreateNewsDto } from "@application/dtos/news/create";

@Injectable()
export class CreateNewsUseCase {
  constructor(private readonly repo: PrismaNewsRepository) {}

  async execute(dto: CreateNewsDto): Promise<void> {
    await this.repo.create({
      title: dto.title,
      description: dto.description,
      date: dto.date ? new Date(dto.date) : null,
      location: dto.location ?? null,
      url: dto.url ?? null
    });
  }
}
