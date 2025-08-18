/*
import { PrismaClient } from "@prisma/client";
import { clearDb } from "./clear-db";
import { userMock } from "prisma/mocks/user";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting seed...");

  await clearDb();

  console.log("Database cleared");

  await prisma.user.createMany({
    data: userMock
  });

  console.log("Seed completed");
}

main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

*/
