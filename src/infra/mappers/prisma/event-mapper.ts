import { Event } from "@domain/entities/event";
import { News as PrismaNews } from "@prisma/client";

export class EventMapper {
  static toDomain(event: PrismaNews): Event {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      url: event.url,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    };
  }
}
