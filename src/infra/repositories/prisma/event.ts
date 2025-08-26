import { EventDetails } from "@application/dtos/event/find-by-id";
import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import { Event } from "@domain/entities/event";
import {
  CreateEventParams,
  EventRepository,
  UpdateEventParams
} from "@domain/repositories/event";
import { PrismaService } from "@infra/config/prisma";
import { EventMapper } from "@infra/mappers/prisma/event-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<Event | null> {
    const event = await this.prisma.news.findUnique({
      where: {
        id
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async findByIdWithDetails(id: string): Promise<EventDetails | null> {
    const event = await this.prisma.news.findUnique({
      where: {
        id
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async findAll({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<EventDetails>> {
    const { events, total } = await this.prisma.$transaction(async (tx) => {
      const events = await tx.news.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          date: "asc"
        }
      });

      const total = await tx.news.count({});

      return { events, total };
    });

    return {
      data: events.map(EventMapper.toDomain),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }

  async findByURL(url: string): Promise<Event | null> {
    const event = await this.prisma.news.findFirst({
      where: {
        url
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async findByTitle(title: string): Promise<Event | null> {
    const event = await this.prisma.news.findFirst({
      where: {
        title
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async findByTitleAndDate(title: string, date: Date): Promise<Event | null> {
    const event = await this.prisma.news.findFirst({
      where: {
        title,
        date
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async create({
    title,
    description,
    date,
    location,
    url
  }: CreateEventParams): Promise<void> {
    await this.prisma.news.create({
      data: {
        title,
        description,
        date,
        location,
        url
      }
    });
  }

  async update(id: string, params: UpdateEventParams): Promise<void> {
    const { title, description, date, location, url } = params;

    await this.prisma.news.update({
      where: { id },
      data: {
        title,
        description,
        date,
        location,
        url
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.news.delete({
      where: {
        id
      }
    });
  }
}
