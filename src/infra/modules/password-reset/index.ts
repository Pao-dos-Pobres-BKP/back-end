import { Module } from "@nestjs/common";
import { PasswordResetController } from "@infra/controllers/password-reset/index";
import { RequestPasswordResetUseCase } from "@application/use-cases/password-reset/request/request-password-reset";
import { ValidateCodeUseCase } from "@application/use-cases/password-reset/validate/validate-code";
import { ResetPasswordUseCase } from "@application/use-cases/password-reset/reset/reset-password";
import { DonorRepository } from "@domain/repositories/donor";
import { AdminRepository } from "@domain/repositories/admin";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { SendEmailUseCase } from "@application/use-cases/mail/send/send-email";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { PrismaAdminRepository } from "@infra/repositories/prisma/admin";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { PrismaPasswordResetTokenRepository } from "@infra/repositories/prisma/password-reset";
import { MailModule } from "../mail";
import { ExceptionModule } from "../exception";
import { DatabaseModule } from "../database";

@Module({
  imports: [DatabaseModule, MailModule, ExceptionModule],
  controllers: [PasswordResetController],
  providers: [
    RequestPasswordResetUseCase,
    ValidateCodeUseCase,
    ResetPasswordUseCase,
    SendEmailUseCase,
    { provide: DonorRepository, useClass: PrismaDonorRepository },
    { provide: AdminRepository, useClass: PrismaAdminRepository },
    { provide: UserRepository, useClass: PrismaUserRepository },
    {
      provide: PasswordResetTokenRepository,
      useClass: PrismaPasswordResetTokenRepository
    }
  ]
})
export class PasswordResetModule {}
