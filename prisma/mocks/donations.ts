import { faker } from "@faker-js/faker";
import { Prisma, Periodicity } from "@prisma/client";

// Create a version that works with the seeding process
// We need to pass actual IDs after users and campaigns are created
export const createDonationsMockWithIds = (
  userIds: string[],
  campaignIds: string[]
): Prisma.DonationCreateInput[] => {
  return Array.from({ length: 25 }).map((_, index) => {
    const amount = faker.number.float({
      min: 25,
      max: 5000,
      fractionDigits: 2
    });

    const hasDonor = faker.datatype.boolean(0.7);
    const hasCampaign = faker.datatype.boolean(0.8);
    const hasPeriodicity = faker.datatype.boolean(0.6);

    const donation: Prisma.DonationCreateInput = {
      amount: amount,
      createdAt: faker.date.between({
        from: new Date("2024-01-01"),
        to: new Date()
      })
    };

    if (hasPeriodicity) {
      donation.periodicity = faker.helpers.arrayElement([
        Periodicity.MONTHLY,
        Periodicity.QUARTERLY,
        Periodicity.SEMI_ANNUAL,
        Periodicity.YEARLY
      ]);
    }

    if (hasDonor && userIds.length > 0) {
      const donorIndex = index % Math.min(userIds.length, 10); // Only use donor users
      donation.donor = {
        connect: {
          id: userIds[donorIndex]
        }
      };
    }

    if (hasCampaign && campaignIds.length > 0) {
      const campaignIndex = index % campaignIds.length;
      donation.campaign = {
        connect: {
          id: campaignIds[campaignIndex]
        }
      };
    }

    return donation;
  });
};
