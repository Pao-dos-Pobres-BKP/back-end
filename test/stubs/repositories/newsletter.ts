import { NewsletterRepository } from "@domain/repositories/newsletter";
import { Newsletter } from "@domain/entities/newsletter";

export class NewsletterRepositoryStub implements NewsletterRepository {
  async findByEmail(): Promise<Newsletter | null> {
    return;
  }

  async create(): Promise<void> {
    return;
  }
}
