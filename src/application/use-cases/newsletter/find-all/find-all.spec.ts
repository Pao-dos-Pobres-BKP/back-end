import { FindAllNewsletterUseCase } from "./find-all";
import { NewsletterRepository } from "@domain/repositories/newsletter";
import { NewsletterRepositoryStub } from "@test/stubs/repositories/newsletter";
import { Newsletter } from "@domain/entities/newsletter";
import { createMockNewsletter } from "@test/builders/newsletter";

describe("FindAllNewsletterUseCase", () => {
  let repository: NewsletterRepository;
  let useCase: FindAllNewsletterUseCase;

  beforeEach(() => {
    repository = new NewsletterRepositoryStub();
    useCase = new FindAllNewsletterUseCase(repository);

    jest.spyOn(repository, "findAll");
  });

  it("should return empty array when no newsletters are found", async () => {
    (repository.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("should return all newsletters when newsletters exist", async () => {
    const mockNewsletters: Newsletter[] = [
      createMockNewsletter({ email: "user1@example.com" }),
      createMockNewsletter({ email: "user2@example.com" }),
      createMockNewsletter({ email: "user3@example.com" })
    ];
    (repository.findAll as jest.Mock).mockResolvedValueOnce(mockNewsletters);

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockNewsletters);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("email");
    expect(result[0]).toHaveProperty("createdAt");
  });

  it("should return single newsletter when only one exists", async () => {
    const mockNewsletter: Newsletter[] = [
      createMockNewsletter({ email: "single@example.com" })
    ];
    (repository.findAll as jest.Mock).mockResolvedValueOnce(mockNewsletter);

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockNewsletter);
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe("single@example.com");
  });
});
