import { FindAllNewsUseCase } from "./find-all-news";
import { makeNewsRepositoryStub } from "@test/stubs/repositories/news";
import { PaginatedEntity } from "@domain/constants/pagination";
import { News } from "@domain/entities/news";

describe("FindAllNewsUseCase", () => {
  let repo: ReturnType<typeof makeNewsRepositoryStub>;
  let useCase: FindAllNewsUseCase;

  beforeEach(() => {
    repo = makeNewsRepositoryStub();
    useCase = new FindAllNewsUseCase(repo);
  });

  it("should return paginated news list", async () => {
    const mockResult: PaginatedEntity<News> = {
      data: [
        {
          id: "1",
          title: "Test News",
          description: "Some description",
          date: new Date(),
          location: "Test Location",
          url: "https://example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      page: 1,
      lastPage: 1,
      total: 1,
    };

    repo.findAll.mockResolvedValueOnce(mockResult);

    const result = await useCase.execute({ page: 1, pageSize: 10 });

    expect(repo.findAll).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result).toEqual(mockResult);
  });

  it("should apply default pagination when no params are provided", async () => {
    const mockResult: PaginatedEntity<News> = {
      data: [],
      page: 1,
      lastPage: 0,
      total: 0,
    };

    repo.findAll.mockResolvedValueOnce(mockResult);

    const result = await useCase.execute({} as any);

    expect(repo.findAll).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result).toEqual(mockResult);
  });
});
