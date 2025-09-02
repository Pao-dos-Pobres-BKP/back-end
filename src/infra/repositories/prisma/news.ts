import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { NewsMapper } from "@infra/mappers/prisma/news-mapper";

import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import {
  CreateNewsParams,
  UpdateNewsParams,
  NewsDetailsResponse,
  NewsRepository
} from "@domain/repositories/news";
import { News } from "@domain/entities/news";

interface PrismaNewsSelect {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  location: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaNewsRepository extends NewsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  override async findById(id: string): Promise<News | null> {
    const row = await this.prisma.news.findUnique({ where: { id } });
    if (!row) return null;
    return NewsMapper.toDomain(row);
  }

  override async findAll({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<NewsDetailsResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.news.findMany({
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          location: true,
          url: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prisma.news.count()
    ]);

    const data: NewsDetailsResponse[] = rows.map((r: PrismaNewsSelect) =>
      NewsMapper.toDetails(r)
    );
    const lastPage = Math.max(1, Math.ceil(total / pageSize));

    return { data, page, lastPage, total };
  }

  override async create(params: CreateNewsParams): Promise<void> {
    await this.prisma.news.create({
      data: {
        title: params.title,
        description: params.description,
        date: params.date ?? null,
        location: params.location ?? null,
        url: params.url ?? null
      }
    });
  }

  override async update(id: string, params: UpdateNewsParams): Promise<void> {
    const data: {
      title?: string;
      description?: string;
      date?: Date | null;
      location?: string | null;
      url?: string | null;
    } = {};

    if (params.title !== undefined) data.title = params.title;
    if (params.description !== undefined) data.description = params.description;
    if (params.date !== undefined) data.date = params.date;
    if (params.location !== undefined) data.location = params.location;
    if (params.url !== undefined) data.url = params.url;

    await this.prisma.news.update({
      where: { id },
      data
    });
  }

  override async delete(id: string): Promise<void> {
    await this.prisma.news.delete({ where: { id } });
  }
}