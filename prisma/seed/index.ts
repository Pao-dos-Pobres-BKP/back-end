import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userDonorsMock } from "../mocks/user";
import { eventsMock } from "../mocks/events";
import { newsMock } from "../mocks/news";
import { newsletterMock } from "prisma/mocks/newsletter";
import { donationsMockForPayments, paymentsMock } from "../mocks/payments";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting seed...");

  await clearDb();

  for (const userData of userDonorsMock) {
    await prisma.user.create({
      data: userData
    });
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

  for (const donationData of donationsMockForPayments) {
    await prisma.donation.create({
      data: donationData
    });
  }

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
