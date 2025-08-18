import { Donor, Gender } from "@domain/entities/donor";
import { Donor as PrismaDonor } from "@prisma/client";
import { User as PrismaUser } from "@prisma/client";
import { UserRole } from "@domain/entities/role";

export class PrismaDonorMapper {
  static toDomain(donor: PrismaDonor, user: PrismaUser): Donor {
    return new Donor(
      {
        fullname: donor.fullName,
        birthDate: donor.birthDate,
        phone: donor.phone,
        gender: donor.gender as Gender,
        email: user.email,
        password: user.password,
        role: UserRole.BASIC
      },
      donor.id,
      donor.createdAt,
      donor.updatedAt
    );
  }

  static toPrisma(donor: Donor): PrismaDonor {
    return {
      id: donor.id,
      fullName: donor.fullname,
      birthDate: donor.birthDate,
      gender: donor.gender,
      phone: donor.phone,
      createdAt: donor.createdAt,
      updatedAt: donor.updatedAt,
      deletedAt: undefined
    };
  }
}
