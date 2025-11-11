import { CampaignRepository } from "@domain/repositories/campaign";
import { Injectable } from "@nestjs/common";
import { Campaign } from "@prisma/client";

@Injectable()
export class FindIsRootCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(): Promise<Campaign> {
    return await this.campaignRepository.findRootCampaign();
  }
}
