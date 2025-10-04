import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clearDb(): Promise<void> {
  // Delete in reverse order of dependencies to avoid foreign key constraint errors

  // First delete donations (they reference campaigns and donors)
  await prisma.donation.deleteMany();

  // Delete campaigns (they reference users)
  await prisma.campaign.deleteMany();

  // Delete independent tables
  await prisma.events.deleteMany();
  await prisma.news.deleteMany();
  await prisma.newsletter.deleteMany();

  // Finally delete users (they are referenced by campaigns)
  await prisma.user.deleteMany();
}
