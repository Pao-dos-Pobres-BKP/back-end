import { Donation } from "@domain/entities/donation";
import { Donation as PrismaDonation } from "@prisma/client";

export class DonationMapper {
  static toDomain(donation: PrismaDonation): Donation {
    return {
      id: donation.id,
      amount: Number(donation.amount),
      periodicity: donation.periodicity,
      impactArea: donation.impactArea,
      campaignId: donation.campaignId,
      donorId: donation.donorId,
      createdAt: donation.createdAt
    };
  }
}
