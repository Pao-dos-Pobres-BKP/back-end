import { DeleteNewsUseCase } from "./delete-news";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

describe("DeleteNewsUseCase", () => {
  let repo: jest.Mocked<PrismaNewsRepository>;
  let useCase: DeleteNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<PrismaNewsRepository>;

    useCase = new DeleteNewsUseCase(repo);
  });

  it("deleta pelo id", async () => {
    await useCase.execute({ id: "abc" });
    expect(repo.delete).toHaveBeenCalledWith("abc");
  });
});
