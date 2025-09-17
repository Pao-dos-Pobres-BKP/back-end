import { DeleteNewsUseCase } from "./delete-news";
import { NewsRepository } from "@domain/repositories/news";
import { NotFoundException } from "@nestjs/common";
import { News } from "@domain/entities/news";
import { ExceptionsAdapter } from "@domain/adapters/exception";

describe("DeleteNewsUseCase", () => {
  let repo: jest.Mocked<NewsRepository>;
  let exceptions: jest.Mocked<ExceptionsAdapter>;
  let useCase: DeleteNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<NewsRepository>;

    exceptions = {
      badRequest: jest.fn(),
      conflict: jest.fn(),
      internalServerError: jest.fn(),
      forbidden: jest.fn(),
      unauthorized: jest.fn(),
      notFound: jest.fn()
    };

    useCase = new DeleteNewsUseCase(repo, exceptions);
  });

  it("should delete an existing news", async () => {
    repo.findById.mockResolvedValueOnce({ id: "valid-id" } as unknown as News);
    repo.delete.mockResolvedValueOnce();

    await expect(useCase.execute("valid-id")).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith("valid-id");
  });

  it("should throw NotFoundException if the news does not exist", async () => {
    repo.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute("invalid-id")).rejects.toThrow(
      NotFoundException
    );
    expect(exceptions.notFound).toHaveBeenCalledWith("News not found");
  });
});
