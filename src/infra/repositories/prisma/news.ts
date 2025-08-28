import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { NewsMapper } from "@infra/mappers/prisma/news-mapper";

import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import {
  CreateNewsParams,
  NewsDetailsResponse,
  NewsRepository,
  UpdateNewsParams
} from "@domain/repositories/news";
import { News } from "@domain/entities/news";

@Injectable()
export class PrismaNewsRepository implements NewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<News | null> {
    const row = await this.prisma.news.findUnique({ where: { id } });
    return row ? NewsMapper.toDomain(row) : null;
  }

  async findAll({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<NewsDetailsResponse>> {
    const { items, total } = await this.prisma.$transaction(async (tx) => {
      const items = await tx.news.findMany({
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      const total = await tx.news.count();
      return { items, total };
    });

    return {
      data: items.map(NewsMapper.toDetails),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }

  async create(params: CreateNewsParams): Promise<void> {
    const { title, description, date, location, url } = params;
    await this.prisma.news.create({
      data: {
        title,
        description,
        date: date ?? null,
        location: location ?? null,
        url: url ?? null
      }
    });
  }

  async update(id: string, params: UpdateNewsParams): Promise<void> {
    try {
      await this.prisma.news.update({
        where: { id },
        data: {
          ...(params.title !== undefined && { title: params.title }),
          ...(params.description !== undefined && {
            description: params.description
          }),
          ...(params.date !== undefined && { date: params.date }),
          ...(params.location !== undefined && { location: params.location }),
          ...(params.url !== undefined && { url: params.url })
        }
      });
    } catch {
      throw new NotFoundException("News not found");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.news.delete({ where: { id } });
    } catch {
      throw new NotFoundException("News not found");
    }
  }
}
