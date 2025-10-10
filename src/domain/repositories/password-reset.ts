import { PasswordResetToken } from "@prisma/client";

export type CreatePasswordResetTokenParams = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export abstract class PasswordResetTokenRepository {
  abstract create(params: CreatePasswordResetTokenParams): Promise<void>;
  abstract findLatestValidTokenByUserId(
    userId: string
  ): Promise<PasswordResetToken | null>;
  abstract deleteUsedCode(tokenId: string): Promise<void>;
  abstract deleteExpiredTokens(): Promise<void>;
  abstract countRecentRequests(
    userId: string,
    withinMinutes: number
  ): Promise<number>;
}
