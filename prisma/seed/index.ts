import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userDonorsMock } from "../mocks/user";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting seed...");

  await clearDb();

  for (const userData of userDonorsMock) {
    await prisma.user.create({
      data: userData
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
