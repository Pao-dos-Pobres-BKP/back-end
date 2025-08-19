import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { TransactionModule } from "../transaction";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";

@Module({
  imports: [DatabaseModule, TransactionModule, ExceptionModule, HashModule]
})
export class DonorModule {}
