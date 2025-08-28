import { ExceptionsAdapter } from "@domain/adapters/exception";
import { EventRepository } from "@domain/repositories/event";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { EventRepositoryStub } from "@test/stubs/repositories/event";
import { CreateEventUseCase } from "./create-event";
import { createMockEvent } from "@test/builders/event";

describe("CreateEventUseCase", () => {
  let sut: CreateEventUseCase;
  let eventRepository: EventRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    eventRepository = new EventRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new CreateEventUseCase(eventRepository, exceptionService);
  });

  it("should throw conflict error when event with same title and date exists", async () => {
    const mockEvent = createMockEvent();

    jest.spyOn(exceptionService, "conflict");
    jest
      .spyOn(eventRepository, "findByTitleAndDate")
      .mockResolvedValue(mockEvent);

    await sut.execute({
      title: mockEvent.title,
      description: "Some description",
      location: "Some location",
      dateStart: mockEvent.dateStart,
      dateEnd: mockEvent.dateEnd
    });

    expect(eventRepository.findByTitleAndDate).toHaveBeenCalledWith(
      mockEvent.title,
      mockEvent.dateStart
    );
    expect(exceptionService.conflict).toHaveBeenCalledWith({
      message: "Event with this title and date already exists"
    });
  });

  it("should throw bad request error when event date is in the past or today", async () => {
    jest.spyOn(exceptionService, "badRequest");
    jest.spyOn(eventRepository, "findByTitleAndDate").mockResolvedValue(null);

    await sut.execute({
      title: "New Event",
      description: "Some description",
      location: "Some location",
      dateStart: new Date(),
      dateEnd: new Date()
    });

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Event date must be in the future"
    });
  });

  it("should create an event successfully", async () => {
    const mockEvent = createMockEvent();

    jest.spyOn(eventRepository, "findByTitleAndDate").mockResolvedValue(null);
    jest.spyOn(eventRepository, "create").mockResolvedValue(undefined);

    await sut.execute({
      title: mockEvent.title,
      description: mockEvent.description,
      location: mockEvent.location,
      dateStart: mockEvent.dateStart,
      dateEnd: mockEvent.dateEnd
    });

    expect(eventRepository.create).toHaveBeenCalledWith({
      title: mockEvent.title,
      description: mockEvent.description,
      location: mockEvent.location,
      eventStartingDate: mockEvent.dateStart,
      eventEndingDate: mockEvent.dateEnd
    });
  });
});
