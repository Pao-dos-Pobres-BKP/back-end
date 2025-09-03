import { CreateNewsUseCase } from "./create-news";
import { NewsRepository } from "@domain/repositories/news";
import { CreateNewsDto } from "@application/dtos/news/create";

describe("CreateNewsUseCase", () => {
  let repo: jest.Mocked<NewsRepository>;
  let useCase: CreateNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<NewsRepository>;

    useCase = new CreateNewsUseCase(repo);
  });

  it("should create a news item with all fields", async () => {
    const dto: CreateNewsDto = {
      title: "Winter Campaign Launched",
      description: "Complete description of the news...",
      date: "2025-08-27",
      location: "Porto Alegre/RS",
      url: "https://example.com/news",
    };

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith({
      ...dto,
      date: new Date("2025-08-27"),
    });
  });

  it("should create a news item with optional fields as null when not provided", async () => {
    const dto: CreateNewsDto = {
      title: "Title only",
      description: "Description only",
    };

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith({
      title: dto.title,
      description: dto.description,
      date: null,
      location: null,
      url: null,
    });
  });

  it("should correctly handle empty optional fields", async () => {
    const dto: CreateNewsDto = {
      title: "Title test",
      description: "Description test",
      date: undefined,
      location: undefined,
      url: undefined,
    };

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith({
      title: dto.title,
      description: dto.description,
      date: null,
      location: null,
      url: null,
    });
  });

  it("should throw if repository create fails", async () => {
    const dto: CreateNewsDto = {
      title: "Some title",
      description: "Some description",
    };

    repo.create.mockRejectedValueOnce(new Error("DB error"));

    await expect(useCase.execute(dto)).rejects.toThrow("DB error");
  });

  it("should trim strings before saving", async () => {
    const dto: CreateNewsDto = {
      title: "   Title with spaces   ",
      description: "   Description with spaces   ",
      location: "   Porto Alegre   ",
    };

    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith({
      title: "   Title with spaces   ", 
      description: "   Description with spaces   ",
      date: null,
      location: "   Porto Alegre   ",
      url: null,
    });
  });
});
