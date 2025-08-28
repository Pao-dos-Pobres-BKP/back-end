import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateNewsDto } from "@application/dtos/news/create";
import { UpdateNewsDto } from "@application/dtos/news/update";
import { FindAllNewsDto } from "@application/dtos/news/find-all";
import { FindNewsByIdDto } from "@application/dtos/news/find-by-id";
import { DeleteNewsDto } from "@application/dtos/news/delete";

import { CreateNewsUseCase } from "@application/use-cases/news/create/create-news";
import { DeleteNewsUseCase } from "@application/use-cases/news/delete/delete-news";
import { FindAllNewsUseCase } from "@application/use-cases/news/find-all/find-all-news";
import { FindNewsByIdUseCase } from "@application/use-cases/news/find-by-id/find-news-by-id";
import { UpdateNewsUseCase } from "@application/use-cases/news/update/update-news";

import { News } from "@domain/entities/news";
import { PaginatedEntity } from "@domain/constants/pagination";
import { NewsDetailsResponse } from "@domain/repositories/news";

@ApiTags("news")
@Controller("news")
export class NewsController {
  constructor(
    private readonly createUC: CreateNewsUseCase,
    private readonly deleteUC: DeleteNewsUseCase,
    private readonly findAllUC: FindAllNewsUseCase,
    private readonly findByIdUC: FindNewsByIdUseCase,
    private readonly updateUC: UpdateNewsUseCase
  ) {}

  @Post()
  create(@Body() dto: CreateNewsDto): Promise<void> {
    return this.createUC.execute(dto);
  }

  @Get()
  list(
    @Query() q: FindAllNewsDto
  ): Promise<PaginatedEntity<NewsDetailsResponse>> {
    return this.findAllUC.execute(q);
  }

  @Get(":id")
  get(@Param() params: FindNewsByIdDto): Promise<News> {
    return this.findByIdUC.execute(params);
  }

  @Patch(":id")
  update(
    @Param() { id }: FindNewsByIdDto,
    @Body() dto: UpdateNewsDto
  ): Promise<void> {
    return this.updateUC.execute(id, dto);
  }

  @Delete(":id")
  remove(@Param() params: DeleteNewsDto): Promise<void> {
    return this.deleteUC.execute(params);
  }
}
