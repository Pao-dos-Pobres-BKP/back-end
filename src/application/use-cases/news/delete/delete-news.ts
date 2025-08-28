import { Injectable } from "@nestjs/common";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { DeleteNewsDto } from "@application/dtos/news/delete";

@Injectable()
export class DeleteNewsUseCase {
  constructor(private readonly repo: PrismaNewsRepository) {}

  async execute({ id }: DeleteNewsDto): Promise<void> {
    await this.repo.delete(id);
  }
}
