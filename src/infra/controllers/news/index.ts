import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateNewsDto } from "@application/dtos/news/create";
import { UpdateNewsDto } from "@application/dtos/news/update";
import { FindAllNewsDto } from "@application/dtos/news/find-all";

import { CreateNewsUseCase } from "@application/use-cases/news/create/create-news";
import { FindAllNewsUseCase } from "@application/use-cases/news/find-all/find-all-news";
import { FindNewsByIdUseCase } from "@application/use-cases/news/find-by-id/find-news-by-id";
import { UpdateNewsUseCase } from "@application/use-cases/news/update/update-news";
import { DeleteNewsUseCase } from "@application/use-cases/news/delete/delete-news";

import { PaginatedEntity } from "@domain/constants/pagination";
import { News } from "@domain/entities/news";

@ApiTags("News") // <- com N maiúsculo
@Controller("news")
export class NewsController {
  constructor(
    private readonly createUC: CreateNewsUseCase,
    private readonly findAllUC: FindAllNewsUseCase,
    private readonly findByIdUC: FindNewsByIdUseCase,
    private readonly updateUC: UpdateNewsUseCase,
    private readonly deleteUC: DeleteNewsUseCase
  ) {}

  @Post()
  async create(@Body() dto: CreateNewsDto): Promise<void> {
    return await this.createUC.execute(dto);
  }

  @Get()
  async list(@Query() q: FindAllNewsDto): Promise<PaginatedEntity<News>> {
    return await this.findAllUC.execute(q);
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<News> {
    return await this.findByIdUC.execute(id);
  }

  @Patch(":id")
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() dto: UpdateNewsDto): Promise<void> {
    return await this.updateUC.execute(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string): Promise<void> {
    return await this.deleteUC.execute(id);
  }
}
