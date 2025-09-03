import { News } from "@domain/entities/news";
import { News as PrismaNews } from "@prisma/client";

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
}
