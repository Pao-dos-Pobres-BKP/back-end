import { EventDetails } from "@application/dtos/event/find-by-id";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindEventByIdUseCase {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(id: string): Promise<EventDetails | void> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      return this.exceptionService.notFound({
        message: "Event not found"
      });
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      dateStart: new Date(event.dateStart.getTime() + 3 * 60 * 60 * 1000),
      dateEnd: new Date(event.dateEnd.getTime() + 3 * 60 * 60 * 1000),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    };
  }
}
