import { EventRepository } from "@domain/repositories/event";
import { FindAllEventsUseCase } from "./find-all-events";
import { EventRepositoryStub } from "@test/stubs/repositories/event";

describe("FindAllEventsUseCase", () => {
  let sut: FindAllEventsUseCase;
  let eventRepository: EventRepository;

  beforeEach(() => {
    eventRepository = new EventRepositoryStub();
    sut = new FindAllEventsUseCase(eventRepository);
  });

  it("should return all events paginated", async () => {
    const page = 1;
    const pageSize = 10;

    jest.spyOn(eventRepository, "findAll");

    await sut.execute({
      page,
      pageSize
    });

    expect(eventRepository.findAll).toHaveBeenCalledWith({ page, pageSize });
  });
});
