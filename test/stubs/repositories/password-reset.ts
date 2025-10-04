import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { PasswordResetToken } from "@prisma/client";
import { CreatePasswordResetTokenParams } from "@domain/repositories/password-reset";

export class PasswordResetTokenRepositoryStub
  implements PasswordResetTokenRepository
{
  public tokens: PasswordResetToken[] = [];

  async create(params: CreatePasswordResetTokenParams): Promise<void> {
    const token: PasswordResetToken = {
      id: "token-id-" + Math.random().toString(36).substring(2),
      userId: params.userId,
      token: params.tokenHash,
      expiresAt: params.expiresAt,
      createdAt: new Date()
    };

    this.tokens.push(token);
  }

  async findLatestValidTokenByUserId(
    userId: string
  ): Promise<PasswordResetToken | null> {
    const token = this.tokens
      .filter((t) => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    return token || null;
  }

  async markAsUsed(tokenId: string): Promise<void> {
    this.tokens = this.tokens.filter((t) => t.id !== tokenId);
  }

  async deleteExpiredTokens(): Promise<void> {
    const now = new Date();
    this.tokens = this.tokens.filter((t) => t.expiresAt > now);
  }

  async countRecentRequests(
    userId: string,
    withinMinutes: number
  ): Promise<number> {
    const now = new Date();
    const threshold = new Date(now.getTime() - withinMinutes * 60 * 1000);

    return this.tokens.filter(
      (t) => t.userId === userId && t.createdAt >= threshold
    ).length;
  }
}
