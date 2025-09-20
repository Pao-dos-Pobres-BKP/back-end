import { Campaign } from "@prisma/client";

export class CampaignMapper {
  static toDomain(campaign: Campaign): Campaign {
    return {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      imageUrl: campaign.imageUrl,
      targetAmount: campaign.targetAmount,
      currentAmount: campaign.currentAmount,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status,
      createdBy: campaign.createdBy
    };
  }
}
