import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { FindEventByIdUseCase } from "./find-event-by-id";
import { EventRepositoryStub } from "@test/stubs/repositories/event";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { createMockEvent } from "@test/builders/event";

describe("FindEventByIdUseCase", () => {
  let sut: FindEventByIdUseCase;
  let eventRepository: EventRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    eventRepository = new EventRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new FindEventByIdUseCase(eventRepository, exceptionService);
  });

  it("should throw an error when no event is found with that id", async () => {
    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(eventRepository, "findById").mockResolvedValue(null);

    await sut.execute("example-event-id");

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Event not found"
    });
  });

  it("should return event details", async () => {
    const mockEvent = createMockEvent();

    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(eventRepository, "findById").mockResolvedValue(mockEvent);

    const result = await sut.execute("example-event-id");

    expect(result).toEqual({
      id: mockEvent.id,
      title: mockEvent.title,
      description: mockEvent.description,
      location: mockEvent.location,
      dateStart: mockEvent.dateStart,
      dateEnd: mockEvent.dateEnd,
      createdAt: mockEvent.createdAt,
      updatedAt: mockEvent.updatedAt
    });

    expect(exceptionService.notFound).not.toHaveBeenCalled();
  });
});
