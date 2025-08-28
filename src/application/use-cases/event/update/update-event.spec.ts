import { EventRepositoryStub } from "@test/stubs/repositories/event";
import { UpdateEventUseCase } from "./update-event";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { createMockEventWithDetails } from "@test/builders/event";

describe("UpdateEventUseCase", () => {
  let sut: UpdateEventUseCase;
  let eventRepository: EventRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    eventRepository = new EventRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new UpdateEventUseCase(eventRepository, exceptionService);
  });

  it("should throw an error when not found an event with that id", async () => {
    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(eventRepository, "update");

    await sut.execute("example-event-id", {
      title: "Updated Event"
    });

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Event not found"
    });

    expect(eventRepository.update).not.toHaveBeenCalled();
  });

  it("should update an event", async () => {
    const eventWithDetailsMock = createMockEventWithDetails();

    jest.spyOn(eventRepository, "update");

    const updateData = {
      title: "Updated Event Title",
      description: "Updated Description",
      dateStart: new Date("2025-01-01"),
      dateEnd: new Date("2025-01-02"),
      location: "Updated Location"
    };

    await sut.execute(eventWithDetailsMock.id, updateData);

    expect(eventRepository.update).toHaveBeenCalledWith(
      eventWithDetailsMock.id,
      updateData
    );
  });
});
