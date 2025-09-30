import {
  CampaignSocialDataResponse,
  GenderDistribution,
  AgeDistribution,
  CampaignInfo
} from "@application/dtos/campaign/social-data";
import {
  CampaignRepository,
  DonorSocialDataResponse
} from "@domain/repositories/campaign";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetCampaignSocialDataUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute(campaignId: string): Promise<CampaignSocialDataResponse> {
    const campaign = await this.campaignRepository.findById(campaignId);
    if (!campaign) {
      throw new NotFoundException("Campaign not found");
    }

    const donorsData =
      await this.campaignRepository.findDonorsSocialDataByCampaign(campaignId);

    const genderDistribution = this.calculateGenderDistribution(donorsData);

    const ageDistribution = this.calculateAgeDistribution(donorsData);

    const campaignInfo: CampaignInfo = {
      description: campaign.description,
      targetAmount: Number(campaign.targetAmount),
      currentAmount: Number(campaign.currentAmount),
      percentage:
        Number(campaign.targetAmount) > 0
          ? Number(
              (
                (Number(campaign.currentAmount) /
                  Number(campaign.targetAmount)) *
                100
              ).toFixed(3)
            )
          : 0,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      imageUrl: campaign.imageUrl,
      campaignStatus: campaign.status
    };

    return {
      campaign: campaignInfo,
      genderDistribution,
      ageDistribution
    };
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  private getAgeRange(age: number): string {
    if (age < 18) return "Under 18";
    if (age <= 25) return "18-25";
    if (age <= 35) return "26-35";
    if (age <= 50) return "36-50";
    return "50+";
  }

  private calculateGenderDistribution(
    donors: DonorSocialDataResponse[]
  ): GenderDistribution[] {
    const genderCounts = donors.reduce(
      (acc, donor) => {
        const genderLower = donor.gender.toLowerCase();
        acc[genderLower] = (acc[genderLower] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(genderCounts).map(([gender, count]) => ({
      gender,
      count
    }));
  }

  private calculateAgeDistribution(
    donors: DonorSocialDataResponse[]
  ): AgeDistribution[] {
    const ageCounts = donors.reduce(
      (acc, donor) => {
        const age = this.calculateAge(donor.birthDate);
        const ageRange = this.getAgeRange(age);
        acc[ageRange] = (acc[ageRange] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(ageCounts).map(([ageRange, count]) => ({
      ageRange,
      count
    }));
  }
}
