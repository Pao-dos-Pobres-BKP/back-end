import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception/exception.module";
import { DonorController } from "@infra/controllers/donor/donor.controller";
import { DonorUseCase } from "../../../application/use-cases/donor/donor.use-case";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
  imports: [DatabaseModule, ExceptionModule, CryptographyModule],
  controllers: [DonorController],
  providers: [DonorUseCase]
})
export class DonorModule {}
