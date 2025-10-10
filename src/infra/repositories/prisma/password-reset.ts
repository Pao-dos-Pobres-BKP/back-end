import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import {
  PasswordResetTokenRepository,
  CreatePasswordResetTokenParams
} from "@domain/repositories/password-reset";
import { PasswordResetToken } from "@prisma/client";

@Injectable()
export class PrismaPasswordResetTokenRepository
  implements PasswordResetTokenRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: CreatePasswordResetTokenParams): Promise<void> {
    const { userId, tokenHash, expiresAt } = params;
    await this.prismaService.passwordResetToken.create({
      data: {
        userId,
        token: tokenHash,
        expiresAt
      }
    });
  }

  async findLatestValidTokenByUserId(
    userId: string
  ): Promise<PasswordResetToken | null> {
    const now = new Date();

    return this.prismaService.passwordResetToken.findFirst({
      where: {
        userId,
        expiresAt: { gt: now }
      },
      orderBy: { expiresAt: "desc" }
    });
  }

  async deleteUsedCode(tokenId: string): Promise<void> {
    await this.prismaService.passwordResetToken.delete({
      where: { id: tokenId }
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    const now = new Date();
    await this.prismaService.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: now }
      }
    });
  }

  async countRecentRequests(
    userId: string,
    withinMinutes: number
  ): Promise<number> {
    const now = new Date();
    const past = new Date(now.getTime() - withinMinutes * 60000);

    return this.prismaService.passwordResetToken.count({
      where: {
        userId,
        createdAt: { gt: past }
      }
    });
  }
}
