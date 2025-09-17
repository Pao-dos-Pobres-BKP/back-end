import { LoginUseCase } from "@application/use-cases/auth/login/login";
import { AuthController } from "@infra/controllers/auth";
import { Module } from "@nestjs/common";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";
import { TokenModule } from "../token";
import { DatabaseModule } from "../database";

@Module({
  imports: [DatabaseModule, ExceptionModule, HashModule, TokenModule],
  controllers: [AuthController],
  providers: [LoginUseCase]
})
export class AuthModule {}
