import { UpdateNewsUseCase } from "./update-news";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

describe("UpdateNewsUseCase", () => {
  let repo: jest.Mocked<PrismaNewsRepository>;
  let useCase: UpdateNewsUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as unknown as jest.Mocked<PrismaNewsRepository>;

    useCase = new UpdateNewsUseCase(repo);
  });

  it("atualiza apenas os campos enviados", async () => {
    await useCase.execute("id1", {
      title: "Novo título",
      date: "2025-08-27"
    });

    expect(repo.update).toHaveBeenCalledTimes(1);
    const [id, patch] = repo.update.mock.calls[0];
    expect(id).toBe("id1");
    expect(patch.title).toBe("Novo título");
    expect(patch.date).toBeInstanceOf(Date);
    // campos não enviados não devem aparecer no patch
    expect(patch).not.toHaveProperty("description");
    expect(patch).not.toHaveProperty("location");
    expect(patch).not.toHaveProperty("url");
  });

  it("converte date undefined para não enviar, e null para null", async () => {
    await useCase.execute("id1", { date: undefined });
    let patch = repo.update.mock.calls.at(-1)![1];
    expect(patch).not.toHaveProperty("date");

    await useCase.execute("id1", { date: null as unknown as string });
    patch = repo.update.mock.calls.at(-1)![1];
    expect(patch.date).toBeNull();
  });
});
