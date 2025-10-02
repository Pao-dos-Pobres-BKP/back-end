import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userDonorsMock } from "../mocks/user";
import { eventsMock } from "../mocks/events";
import { newsMock } from "../mocks/news";
import { newsletterMock } from "prisma/mocks/newsletter";

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
