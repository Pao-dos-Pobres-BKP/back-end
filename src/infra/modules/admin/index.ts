import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { HashModule } from "../hash";
import { TokenModule } from "../token";
import { AdminController } from "@infra/controllers/admin";
import { ExceptionModule } from "../exception";
import { FindAdminByIdUseCase } from "@application/use-cases/admin/find-by-id/find-admin-by-id";
import { CreateAdminUseCase } from "@application/use-cases/admin/create/create-admin";
import { UpdateAdminUseCase } from "@application/use-cases/admin/update/update-admin";
import { DeleteAdminUseCase } from "@application/use-cases/admin/delete/delete-admin";
import { FindAllAdminsUseCase } from "@application/use-cases/admin/find-all/find-all-admins";
import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";

@Module({
  imports: [DatabaseModule, ExceptionModule, HashModule, TokenModule],
  controllers: [AdminController],
  providers: [
    CreateAdminUseCase,
    UpdateAdminUseCase,
    DeleteAdminUseCase,
    FindAdminByIdUseCase,
    FindAllAdminsUseCase,
    AuthTokenGuard,
    RoleGuard
  ]
})
export class AdminModule {}
