import { CreateEventDTO } from "@application/dtos/event/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateEventUseCase {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute({
    title,
    description,
    location,
    date,
    url
  }: CreateEventDTO): Promise<void> {
    const existingEvent = await this.eventRepository.findByTitleAndDate(
      title,
      date
    );

    if (existingEvent) {
      return this.exceptionService.conflict({
        message: "Event with this title and date already exists"
      });
    }

    if (date <= new Date()) {
      return this.exceptionService.badRequest({
        message: "Event date must be in the future"
      });
    }

    await this.eventRepository.create({
      title,
      description,
      location,
      date,
      url
    });
  }
}
