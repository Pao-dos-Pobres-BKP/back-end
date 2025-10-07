import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { CampaignController } from "@infra/controllers/campaign";
import { FindCampaignByIdUseCase } from "@application/use-cases/campaign/find-by-id/find-campaing-by-id";
import { SearchCampaignsUseCase } from "@application/use-cases/campaign/search/search-campaigns";
import {
  UpdateCampaignStatusUseCase,
  UpdateCampaignUseCase
} from "@application/use-cases/campaign/update/update-campaign";
import { DeleteCampaignUseCase } from "@application/use-cases/campaign/delete/delete-campaign";
import { CreateCampaignUseCase } from "@application/use-cases/campaign/create/create-campaign";
import { ExceptionModule } from "../exception";
import { HashModule } from "../hash";
import { TokenModule } from "../token";
import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { ComparePaymentMethodsUseCase } from "@application/use-cases/campaign/compare-payment-methods/compare-payment-methods";

@Module({
  imports: [DatabaseModule, ExceptionModule, HashModule, TokenModule],
  controllers: [CampaignController],
  providers: [
    CreateCampaignUseCase,
    UpdateCampaignUseCase,
    UpdateCampaignStatusUseCase,
    DeleteCampaignUseCase,
    FindCampaignByIdUseCase,
    SearchCampaignsUseCase,
    ComparePaymentMethodsUseCase,
    AuthTokenGuard,
    RoleGuard
  ]
})
export class CampaignModule {}
