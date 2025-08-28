import { FindNewsByIdUseCase } from "./find-news-by-id";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";
import { NotFoundException } from "@nestjs/common";
import { News } from "@domain/entities/news";

describe("FindNewsByIdUseCase", () => {
  let repo: jest.Mocked<PrismaNewsRepository>;
  let useCase: FindNewsByIdUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<PrismaNewsRepository>;

    useCase = new FindNewsByIdUseCase(repo);
  });

  it("retorna a notícia quando encontrada", async () => {
    const now = new Date();
    const found = new News("id1", "t", "d", null, null, null, now, now);
    repo.findById.mockResolvedValue(found);

    const result = await useCase.execute({ id: "id1" });
    expect(result).toBe(found);
    expect(repo.findById).toHaveBeenCalledWith("id1");
  });

  it("lança NotFound quando não encontrada", async () => {
    repo.findById.mockResolvedValue(null);
    await expect(useCase.execute({ id: "x" })).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
