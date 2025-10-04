import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userDonorsMock } from "../mocks/user";
import { eventsMock } from "../mocks/events";
import { newsMock } from "../mocks/news";
import { newsletterMock } from "prisma/mocks/newsletter";
import { campaignsMock } from "../mocks/campaigns";
import { createDonationsMockWithIds } from "../mocks/donations";
import { createPaymentsMockWithIds } from "../mocks/payments";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting seed...");

  await clearDb();

  // Track created IDs for donations and payments
  const userIds: string[] = [];
  const campaignIds: string[] = [];
  const donationIds: string[] = [];

  for (const userData of userDonorsMock) {
    const user = await prisma.user.create({
      data: userData
    });
    userIds.push(user.id);
  }

  for (const eventsData of eventsMock) {
    await prisma.events.create({
      data: eventsData
    });
  }

  for (const newsData of newsMock) {
    await prisma.news.create({
      data: newsData
    });
  }

  for (const newsletterData of newsletterMock) {
    await prisma.newsletter.create({
      data: newsletterData
    });
  }

  for (const campaignData of campaignsMock) {
    const campaign = await prisma.campaign.create({
      data: campaignData
    });
    campaignIds.push(campaign.id);
  }

  // Create donations with proper relationships
  const donorUserIds = userIds.slice(0, 10); // First 10 are donors
  const donationsMock = createDonationsMockWithIds(donorUserIds, campaignIds);

  for (const donationData of donationsMock) {
    const donation = await prisma.donation.create({
      data: donationData
    });
    donationIds.push(donation.id);
  }

  // Create payments for donations
  const paymentsMock = createPaymentsMockWithIds(donationIds);

  for (const paymentData of paymentsMock) {
    await prisma.payment.create({
      data: paymentData
    });
  }
}

main()
  .then(() => {
    console.log("Seed completed ✅");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
