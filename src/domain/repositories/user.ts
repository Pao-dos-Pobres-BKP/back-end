import { User } from "@domain/entities/user";
import { PasswordResetToken } from "@prisma/client";

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract upsertPasswordReset(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void>;
  abstract validatePasswordResetToken(
    email: string,
    token: string
  ): Promise<boolean>;
  abstract changePassword(email: string, newPassword: string): Promise<void>;
  abstract findIfUserRequestedPasswordReset(
    email: string
  ): Promise<PasswordResetToken | null>;
}
