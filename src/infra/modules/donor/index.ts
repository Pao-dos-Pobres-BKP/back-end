import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { TransactionModule } from "../transaction";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";
import { DonorController } from "@infra/controllers/donor";
import { CreateDonorUseCase } from "@application/use-cases/donor/create";
import { DeleteDonorUseCase } from "@application/use-cases/donor/delete";
import { FindAllDonorsUseCase } from "@application/use-cases/donor/find-all";
import { FindDonorByIdUseCase } from "@application/use-cases/donor/find-by-id";
import { UpdateDonorUseCase } from "@application/use-cases/donor/update";

@Module({
  imports: [DatabaseModule, TransactionModule, ExceptionModule, HashModule],
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
