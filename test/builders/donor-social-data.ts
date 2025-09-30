import { DonorSocialDataResponse } from "@domain/repositories/campaign";
import { Gender } from "@domain/entities/gender-enum";
import { faker } from "@faker-js/faker";

export const createMockDonorSocialData = (
  override: Partial<DonorSocialDataResponse> = {}
): DonorSocialDataResponse => ({
  id: faker.string.uuid(),
  fullName: faker.person.fullName(),
  gender: faker.helpers.arrayElement(Object.values(Gender)),
  birthDate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
  state: faker.location.state({ abbreviated: true }),
  city: faker.location.city(),
  ...override
});

export const createMockDonorsSocialDataList = (
  count: number = 5,
  override: Partial<DonorSocialDataResponse> = {}
): DonorSocialDataResponse[] => {
  return Array.from({ length: count }, () => createMockDonorSocialData(override));
};