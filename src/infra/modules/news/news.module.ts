import { Module } from "@nestjs/common";
import { NewsController } from "@infra/controllers/news";

import { PrismaService } from "@infra/config/prisma";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

import { CreateNewsUseCase } from "@application/use-cases/news/create/create-news";
import { DeleteNewsUseCase } from "@application/use-cases/news/delete/delete-news";
import { FindAllNewsUseCase } from "@application/use-cases/news/find-all/find-all-news";
import { FindNewsByIdUseCase } from "@application/use-cases/news/find-by-id/find-news-by-id";
import { UpdateNewsUseCase } from "@application/use-cases/news/update/update-news";

@Module({
  controllers: [NewsController],
  providers: [
    PrismaService,
    PrismaNewsRepository,
    CreateNewsUseCase,
    DeleteNewsUseCase,
    FindAllNewsUseCase,
    FindNewsByIdUseCase,
    UpdateNewsUseCase
  ],
  exports: [
    CreateNewsUseCase,
    DeleteNewsUseCase,
    FindAllNewsUseCase,
    FindNewsByIdUseCase,
    UpdateNewsUseCase
  ]
})
export class NewsModule {}
