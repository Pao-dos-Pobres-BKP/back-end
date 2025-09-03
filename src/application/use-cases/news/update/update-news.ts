import { Injectable } from "@nestjs/common";
import { NewsRepository } from "@domain/repositories/news";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UpdateNewsDto } from "@application/dtos/news/update";

@Injectable()
export class UpdateNewsUseCase {
  constructor(
    private readonly repo: NewsRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(id: string, dto: UpdateNewsDto): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      this.exceptions.notFound({ message: "News not found" });
    }

    await this.repo.update(id, {
      ...dto,
      date: dto.date ? new Date(dto.date) : undefined,
    });
  }
}
