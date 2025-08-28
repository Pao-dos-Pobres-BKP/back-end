import { News } from "@domain/entities/news";
import { News as PrismaNews } from "@prisma/client";
import { NewsDetailsResponse } from "@domain/repositories/news";

export class NewsMapper {
  static toDomain(raw: PrismaNews): News {
    return new News(
      raw.id,
      raw.title,
      raw.description,
      raw.date,
      raw.location,
      raw.url,
      raw.createdAt,
      raw.updatedAt
    );
  }

  static toDetails(raw: PrismaNews): NewsDetailsResponse {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      date: raw.date,
      location: raw.location,
      url: raw.url,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    };
  }
}
