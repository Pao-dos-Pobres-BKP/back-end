import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception/exception.module";
import { UserController } from "@infra/controllers/user/user.controller";
import { UserUseCase } from "../../../application/use-cases/user/user.use-case";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
  imports: [DatabaseModule, ExceptionModule, CryptographyModule],
  controllers: [UserController],
  providers: [UserUseCase]
})
export class UserModule {}
