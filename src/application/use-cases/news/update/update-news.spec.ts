import { UpdateNewsUseCase } from "./update-news";
import { makeNewsRepositoryStub } from "@test/stubs/repositories/news";
import { UpdateNewsDto } from "@application/dtos/news/update";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { News } from "@domain/entities/news";

describe("UpdateNewsUseCase", () => {
  let repo: ReturnType<typeof makeNewsRepositoryStub>;
  let exceptions: jest.Mocked<ExceptionsAdapter>;
  let useCase: UpdateNewsUseCase;

  beforeEach(() => {
    repo = makeNewsRepositoryStub();

    exceptions = {
      notFound: jest.fn(),
      badRequest: jest.fn(),
      conflict: jest.fn(),
      internalServerError: jest.fn(),
      forbidden: jest.fn(),
      unauthorized: jest.fn()
    } as jest.Mocked<ExceptionsAdapter>;

    useCase = new UpdateNewsUseCase(repo, exceptions);
  });

  it("should call repository update with correct parameters", async () => {
    const dto: UpdateNewsDto = {
      title: "Updated Title",
      description: "Updated description",
      date: "2025-09-05",
      location: "New Location",
      url: "https://updated.com"
    };

    repo.findById.mockResolvedValueOnce({
      id: "news-id-123"
    } as unknown as News);

    await useCase.execute("news-id-123", dto);

    expect(repo.update).toHaveBeenCalledWith("news-id-123", {
      title: dto.title,
      description: dto.description,
      date: new Date(dto.date),
      location: dto.location,
      url: dto.url
    });
  });

  it("should call exceptions.badRequest when no fields provided", async () => {
    const dto: UpdateNewsDto = {};

    repo.findById.mockResolvedValueOnce({
      id: "news-id-123"
    } as unknown as News);

    await useCase.execute("news-id-123", dto);

    expect(exceptions.badRequest).toHaveBeenCalledWith({
      message: "No fields provided to update"
    });
    expect(repo.update).not.toHaveBeenCalled();
  });

  it("should call exceptions.notFound when news does not exist", async () => {
    const dto: UpdateNewsDto = { title: "Anything" };

    repo.findById.mockResolvedValueOnce(null);

    await useCase.execute("non-existing-id", dto);

    expect(exceptions.notFound).toHaveBeenCalledWith({
      message: "News not found"
    });
    expect(repo.update).not.toHaveBeenCalled();
  });
});
