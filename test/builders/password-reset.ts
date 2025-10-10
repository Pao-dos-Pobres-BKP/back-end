import { PasswordResetToken } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const createMockPasswordResetToken = (
  override: Partial<PasswordResetToken> = {}
): PasswordResetToken => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    token: faker.string.alphanumeric(32),
    expiresAt,
    createdAt: now,
    ...override
  };
};
