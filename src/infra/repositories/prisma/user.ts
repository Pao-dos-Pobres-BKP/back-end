import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { UserMapper } from "@infra/mappers/prisma/user-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async upsertPasswordReset(userId: string, token: string, expiresAt: Date) {
    await this.prisma.passwordResetToken.upsert({
      where: { userId },
      update: { token, expiresAt },
      create: { userId, token, expiresAt }
    });
  }

  async validatePasswordResetToken(
    email: string,
    token: string
  ): Promise<boolean> {
    const passwordReset = await this.prisma.passwordResetToken.findFirst({
      where: {
        token,
        user: { email }
      }
    });

    if (!passwordReset) return false;
    if (new Date(passwordReset.expiresAt) < new Date()) return false;

    return true;
  }

  async changePassword(email: string, newPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { password: newPassword }
    });
  }

  async findIfUserRequestedPasswordReset(email: string) {
    return this.prisma.passwordResetToken.findFirst({
      where: { user: { email } },
      orderBy: { expiresAt: "desc" }
    });
  }
}
