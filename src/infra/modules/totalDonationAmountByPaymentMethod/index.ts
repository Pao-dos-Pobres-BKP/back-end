import { Module } from "@nestjs/common";
import { ExceptionModule } from "../exception";
import { FindTotalDonationAmountByPaymentMethodAndDateUseCase } from "@application/use-cases/totalDonationAmountByPaymentMethod/find-by-date/find-by-date";
import { TotalDonationAmountByPaymentMethodController } from "@infra/controllers/totalDonationAmountByPaymenteMethod";
import { DatabaseModule } from "../database";

@Module({
  imports: [DatabaseModule, ExceptionModule],
  controllers: [TotalDonationAmountByPaymentMethodController],
  providers: [FindTotalDonationAmountByPaymentMethodAndDateUseCase]
})
export class TotalDonationAmountByPaymentMethodModule {}
