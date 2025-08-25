import { UpdateEventDTO } from "@application/dtos/event/update";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(id: string, params: UpdateEventDTO): Promise<void> {
    const { title, date, location, description } = params;

    const event = await this.eventRepository.findByIdWithDetails(id);

    if (!event) {
      return this.exceptionService.notFound({
        message: "Event not found"
      });
    }

    if (title && title !== event.title) {
      const eventWithTitle = await this.eventRepository.findByTitle(title);
      if (eventWithTitle) {
        return this.exceptionService.conflict({
          message: "Event title already used"
        });
      }
    }

    if (date && date < new Date()) {
      return this.exceptionService.badRequest({
        message: "Event date must be today or in the future"
      });
    }

    await this.eventRepository.update(id, {
      title,
      date,
      location,
      description
    });
  }
}
