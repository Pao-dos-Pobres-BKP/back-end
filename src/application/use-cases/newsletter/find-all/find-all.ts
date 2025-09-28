import { Newsletter } from "@domain/entities/newsletter";
import { NewsletterRepository } from "@domain/repositories/newsletter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllNewsletterUseCase {
  constructor(private readonly newsletterRepository: NewsletterRepository) {}

  async execute(): Promise<Newsletter[]> {
    return this.newsletterRepository.findAll();
  }
}
