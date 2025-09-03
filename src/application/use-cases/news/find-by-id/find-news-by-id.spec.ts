import { FindNewsByIdUseCase } from "./find-news-by-id";
import { makeNewsRepositoryStub } from "@test/stubs/repositories/news";
import { NotFoundException } from "@nestjs/common";
import { News } from "@domain/entities/news";

describe("FindNewsByIdUseCase", () => {
  let repo: ReturnType<typeof makeNewsRepositoryStub>;
  let useCase: FindNewsByIdUseCase;

  beforeEach(() => {
    repo = makeNewsRepositoryStub();

    const exceptions = {
      notFound: (msg: string) => new NotFoundException(msg),
    } as any;

    useCase = new FindNewsByIdUseCase(repo, exceptions);
  });

  it("should return news when a valid id is provided", async () => {
    const mockNews: News = {
      id: "1",
      title: "Test News",
      description: "Some description",
      date: new Date(),
      location: "Test Location",
      url: "https://example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repo.findById.mockResolvedValueOnce(mockNews);

    const result = await useCase.execute("1");

    expect(repo.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockNews);
  });

  it("should throw NotFoundException if the news does not exist", async () => {
    repo.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute("invalid-id")).rejects.toThrow(NotFoundException);
  });
});
