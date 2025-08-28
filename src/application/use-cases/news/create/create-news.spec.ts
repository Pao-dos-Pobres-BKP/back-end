import { CreateNewsUseCase } from "./create-news";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

describe("CreateNewsUseCase", () => {
  let repo: jest.Mocked<PrismaNewsRepository>;
  let useCase: CreateNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<PrismaNewsRepository>;

    useCase = new CreateNewsUseCase(repo);
  });

  it("cria notícia convertendo date string para Date", async () => {
    await useCase.execute({
      title: "Título",
      description: "Descrição",
      date: "2025-08-27",
      location: "Porto Alegre",
      url: "https://exemplo.com"
    });

    expect(repo.create).toHaveBeenCalledTimes(1);
    const arg = repo.create.mock.calls[0][0];
    expect(arg.title).toBe("Título");
    expect(arg.description).toBe("Descrição");
    expect(arg.location).toBe("Porto Alegre");
    expect(arg.url).toBe("https://exemplo.com");
    expect(arg.date).toBeInstanceOf(Date);
  });

  it("cria notícia com date nulo quando omitido", async () => {
    await useCase.execute({
      title: "Sem data",
      description: "Desc"
    });

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Sem data",
        date: null
      })
    );
  });
});
