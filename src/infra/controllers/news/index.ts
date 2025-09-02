import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  BadRequestException,
  PipeTransform
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";

import { CreateNewsDto } from "@application/dtos/news/create";
import { UpdateNewsDto } from "@application/dtos/news/update";
import { FindAllNewsDto } from "@application/dtos/news/find-all";

import { CreateNewsUseCase } from "@application/use-cases/news/create/create-news";
import { FindAllNewsUseCase } from "@application/use-cases/news/find-all/find-all-news";
import { FindNewsByIdUseCase } from "@application/use-cases/news/find-by-id/find-news-by-id";
import { UpdateNewsUseCase } from "@application/use-cases/news/update/update-news";
import { DeleteNewsUseCase } from "@application/use-cases/news/delete/delete-news";

import { PaginatedEntity } from "@domain/constants/pagination";
import { NewsDetailsResponse } from "@domain/repositories/news";

class NonEmptyStringPipe implements PipeTransform<unknown, string> {
  transform(value: unknown): string {
    if (typeof value !== "string" || !value.trim()) {
      throw new BadRequestException("Invalid id");
    }
    return value;
  }
}

@ApiTags("news")
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
  @ApiCreatedResponse({ description: "Notícia criada com sucesso" })
  create(@Body() dto: CreateNewsDto): Promise<void> {
    return this.createUC.execute(dto);
  }

  @Get()
  @ApiOkResponse({ description: "Lista paginada de notícias" })
  list(
    @Query() q: FindAllNewsDto
  ): Promise<PaginatedEntity<NewsDetailsResponse>> {
    return this.findAllUC.execute(q);
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID da notícia (cuid)" })
  @ApiOkResponse({ description: "Detalhes da notícia" })
  get(@Param("id", new NonEmptyStringPipe()) id: string): Promise<NewsDetailsResponse> {
    return this.findByIdUC.execute(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", description: "ID da notícia (cuid)" })
  @ApiNoContentResponse({ description: "Notícia atualizada com sucesso" })
  @HttpCode(204)
  update(
    @Param("id", new NonEmptyStringPipe()) id: string,
    @Body() dto: UpdateNewsDto
  ): Promise<void> {
    return this.updateUC.execute(id, dto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", description: "ID da notícia (cuid)" })
  @ApiNoContentResponse({ description: "Notícia removida com sucesso" })
  @HttpCode(204)
  remove(@Param("id", new NonEmptyStringPipe()) id: string): Promise<void> {
    return this.deleteUC.execute(id);
  }
}