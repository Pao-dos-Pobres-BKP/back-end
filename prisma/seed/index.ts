import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userDonorsMock, userAdminsMock } from "../mocks/user";
import { eventsMock } from "../mocks/events";
import { newsMock } from "../mocks/news";
import { newsletterMock } from "../mocks/newsletter";
import { addressesMock } from "../mocks/addresses";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting seed...");

  await clearDb();

  const createdDonors = [];
  for (const userData of userDonorsMock) {
    const user = await prisma.user.create({
      data: userData,
      include: { donor: true }
    });
    if (user.donor) {
      createdDonors.push(user.donor.id);
    }
  }

  for (const adminData of userAdminsMock) {
    await prisma.user.create({
      data: adminData
    });
  }

  for (let i = 0; i < Math.min(addressesMock.length, createdDonors.length); i++) {
    const addressData = {
      ...addressesMock[i],
      donor: {
        connect: { id: createdDonors[i] }
      }
    };
    
    await prisma.address.create({
      data: addressData
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
