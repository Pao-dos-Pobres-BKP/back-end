import { User } from "@domain/entities/user";
import { PasswordResetToken } from "@prisma/client";

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract requestToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void>;

  abstract findPasswordResetTokenByUserId(
    userId: string
  ): Promise<PasswordResetToken | null>;
}
