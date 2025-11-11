import { CampaignRepository } from "@domain/repositories/campaign";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateCampaignIsRootUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(id: string, isRoot: boolean): Promise<void> {
    const root = await this.campaignRepository.findRootCampaign();

    if (root && root.id !== id && isRoot) {
      await this.campaignRepository.updateIsRoot(root.id, false);
    }

    await this.campaignRepository.updateIsRoot(id, isRoot);
  }
}
