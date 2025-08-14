import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { CreateUserUseCase } from "@application/use-cases/user/create";
import { UserController } from "@infra/controllers/user";
import { DeleteUserUseCase } from "@application/use-cases/user/delete";
import { FindAllUserUseCase } from "@application/use-cases/user/find-all";
import { FindByIdUserUseCase } from "@application/use-cases/user/find-by-id";
import { UpdateUserUseCase } from "@application/use-cases/user/update";

@Module({
  imports: [DatabaseModule, ExceptionModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindByIdUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
  ]
})
export class UserModule {}
