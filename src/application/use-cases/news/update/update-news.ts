import { Injectable } from "@nestjs/common";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { UpdateNewsDto } from "@application/dtos/news/update";

@Injectable()
export class UpdateNewsUseCase {
  constructor(private readonly repo: PrismaNewsRepository) {}

  async execute(id: string, dto: UpdateNewsDto): Promise<void> {
    await this.repo.update(id, {
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.date !== undefined && {
        date: dto.date ? new Date(dto.date) : null
      }),
      ...(dto.location !== undefined && { location: dto.location ?? null }),
      ...(dto.url !== undefined && { url: dto.url ?? null })
    });
  }
}
