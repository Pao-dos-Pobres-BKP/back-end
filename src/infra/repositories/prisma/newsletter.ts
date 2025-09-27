import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { Newsletter } from "@domain/entities/newsletter";
import {
  NewsletterRepository,
  CreateNewsletterParams
} from "@domain/repositories/newsletter";

@Injectable()
export class PrismaNewsletterRepository implements NewsletterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<Newsletter | null> {
    const newsletter = await this.prismaService.newsletter.findUnique({
      where: { email }
    });

    if (!newsletter) return null;

    return {
      id: newsletter.id,
      email: newsletter.email,
      createdAt: newsletter.createdAt
    };
  }

  async create(data: CreateNewsletterParams): Promise<void> {
    await this.prismaService.newsletter.create({
      data
    });
  }
}
