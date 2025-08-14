import { UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { PrismaUserRepository } from "@infra/repositories/prisma/user-repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserRepository]
})
export class DatabaseModule {}
