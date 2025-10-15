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

  async requestToken(userId: string, hashedToken: string) {
    await this.prisma.passwordResetToken.upsert({
      where: { userId },
      update: {
        token: hashedToken,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      },
      create: {
        userId,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      }
    });
   
  }

  async findPasswordResetTokenByUserId(userId: string) {
    return this.prisma.passwordResetToken.findUnique({
      where: { userId }
    });
  }
}
