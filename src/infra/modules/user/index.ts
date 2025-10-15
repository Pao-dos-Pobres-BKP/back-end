import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";
import { UserController } from "@infra/controllers/user/user.controller";
import { PasswordResetUseCase } from "@application/use-cases/user/password-reset";

@Module({
  imports: [DatabaseModule, ExceptionModule, HashModule],
  controllers: [UserController],
  providers: [PasswordResetUseCase]
})
export class UserModule {}
