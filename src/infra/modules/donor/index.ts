import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";
import { DonorController } from "@infra/controllers/donor";
import { CreateDonorUseCase } from "@application/use-cases/donor/create/create-donor";
import { DeleteDonorUseCase } from "@application/use-cases/donor/delete/delete-donor";
import { FindAllDonorsUseCase } from "@application/use-cases/donor/find-all/find-all-donors";
import { FindDonorByIdUseCase } from "@application/use-cases/donor/find-by-id/find-donor-by-id";
import { UpdateDonorUseCase } from "@application/use-cases/donor/update/update-donor";

@Module({
  imports: [DatabaseModule, ExceptionModule, HashModule],
  controllers: [DonorController],
  providers: [
    CreateDonorUseCase,
    UpdateDonorUseCase,
    DeleteDonorUseCase,
    FindDonorByIdUseCase,
    FindAllDonorsUseCase
  ]
})
export class DonorModule {}
