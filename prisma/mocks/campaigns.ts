import { faker } from "@faker-js/faker";
import { Prisma, CampaignStatus } from "@prisma/client";

export const campaignsMock: Prisma.CampaignCreateInput[] = Array.from({
  length: 8
}).map(() => {
  const startDate = faker.date.between({
    from: new Date("2024-01-01"),
    to: new Date("2024-12-31")
  });
  const endDate = faker.date.between({
    from: startDate,
    to: new Date("2025-12-31")
  });
  const targetAmount = faker.number.float({
    min: 5000,
    max: 100000,
    fractionDigits: 2
  });
  const currentAmount = faker.number.float({
    min: 0,
    max: targetAmount * 0.8,
    fractionDigits: 2
  });

  return {
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraphs(3),
    targetAmount: targetAmount,
    currentAmount: currentAmount,
    startDate: startDate,
    endDate: endDate,
    imageUrl: faker.image.url({ width: 800, height: 600 }),
    status: faker.helpers.arrayElement([
      CampaignStatus.PENDING,
      CampaignStatus.ACTIVE,
      CampaignStatus.PAUSED,
      CampaignStatus.FINISHED
    ]),
    user: {
      connect: {
        email: "admin@example.com"
      }
    }
  };
});
