import { FindAllNewsUseCase } from "./find-all-news";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

describe("FindAllNewsUseCase", () => {
  let repo: jest.Mocked<PrismaNewsRepository>;
  let useCase: FindAllNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn().mockResolvedValue({
        data: [],
        page: 1,
        lastPage: 1,
        total: 0
      }),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<PrismaNewsRepository>;

    useCase = new FindAllNewsUseCase(repo);
  });

  it("lista com paginação default quando não informado", async () => {
    await useCase.execute({});
    expect(repo.findAll).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
  });

  it("lista com paginação customizada", async () => {
    await useCase.execute({ page: 2, pageSize: 5 });
    expect(repo.findAll).toHaveBeenCalledWith({ page: 2, pageSize: 5 });
  });
});
