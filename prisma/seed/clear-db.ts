import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clearDb(): Promise<void> {
  await prisma.user.deleteMany();
}
