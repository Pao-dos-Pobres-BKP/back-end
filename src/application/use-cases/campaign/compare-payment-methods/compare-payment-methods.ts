import { ExceptionsAdapter } from "@domain/adapters/exception";
import { CampaignRepository } from "@domain/repositories/campaign";
import { Injectable } from "@nestjs/common";
import { handleDateRange } from "./handleDateRange";

@Injectable()
export class ComparePaymentMethodsUseCase {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(id: string, startDate: Date, endDate: Date): Promise<void> {
    try {
      const campaign = await this.campaignRepository.findById(id);

      if (!campaign) {
        return this.exceptionService.notFound({
          message: "Campaign not found"
        });
      }

      const dateRangeError = handleDateRange(startDate, endDate);

      if (dateRangeError) {
        return this.exceptionService.badRequest({
          message: dateRangeError.message
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
