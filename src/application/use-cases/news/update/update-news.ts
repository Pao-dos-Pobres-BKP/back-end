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
    if (!existing) this.exceptions.notFound({ message: "News not found" });
    const patch: {
      title?: string;
      description?: string;
      date?: Date | null;
      location?: string | null;
      url?: string | null;
    } = {};

    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.description !== undefined) patch.description = dto.description;

    if (dto.date !== undefined) {
      patch.date = dto.date ? new Date(dto.date) : null;
    }
    if (dto.location !== undefined) patch.location = dto.location ?? null;
    if (dto.url !== undefined) patch.url = dto.url ?? null;

    if (Object.keys(patch).length === 0) {
      this.exceptions.badRequest({ message: "No fields provided to update" });
    }
    await this.repo.update(id, patch);
  }
}
