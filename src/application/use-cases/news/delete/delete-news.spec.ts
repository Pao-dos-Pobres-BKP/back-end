import { DeleteNewsUseCase } from "./delete-news";
import { NewsRepository } from "@domain/repositories/news";
import { NotFoundException } from "@nestjs/common";

describe("DeleteNewsUseCase", () => {
  let repo: jest.Mocked<NewsRepository>;
  let useCase: DeleteNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    };
    useCase = new DeleteNewsUseCase(repo);
  });

  it("deve deletar uma notícia existente", async () => {
    repo.delete.mockResolvedValueOnce();

    await expect(useCase.execute("valid-id")).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith("valid-id");
  });

  it("deve lançar erro caso a notícia não seja encontrada", async () => {
    repo.delete.mockImplementationOnce(() => {
      throw new NotFoundException("News not found");
    });

    await expect(useCase.execute("missing-id")).rejects.toThrow(
      NotFoundException
    );
    expect(repo.delete).toHaveBeenCalledWith("missing-id");
  });
});
