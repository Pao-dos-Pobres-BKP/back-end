import { Injectable } from "@nestjs/common";
import { DonorRepository } from "@domain/repositories/donor";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { Donor } from "@domain/entities/donor";
import { CreateDonorDTO } from "@application/dtos/donor/create";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { UpdateDonorDTO } from "@application/dtos/donor/update";
import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";

@Injectable()
export class DonorUseCase {
  constructor(
    private readonly donorRepository: DonorRepository,
    private readonly exceptionAdapter: ExceptionsAdapter,
    private readonly hashAdapter: CryptographyAdapter
  ) {}

  async createUser(donor: CreateDonorDTO): Promise<Donor> {
    const findUser = await this.donorRepository.findDonorByEmail(donor.email);

    if (findUser) {
      throw this.exceptionAdapter.badRequest({
        message: "Already exist user with this email"
      });
    }

    const hashedPassword = await this.hashAdapter.generateHash(donor.password);
    const newUser = new Donor({
      email: donor.email,
      password: hashedPassword
    });
    return await this.donorRepository.create(newUser);
  }

  async findUserById(id: string): Promise<Donor> {
    const user = await this.donorRepository.findById(id);
    if (!user) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    return user;
  }

  async findAllPaginated({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<Donor>> {
    return await this.donorRepository.findAllDonors({
      page,
      pageSize
    });
  }

  async updateUser(
    id: string,
    updateUserDTO: UpdateDonorDTO
  ): Promise<Donor | void> {
    const user = await this.donorRepository.findById(id);
    if (!user) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    if (updateUserDTO.email) {
      const emailAlreadyUse = await this.donorRepository.findDonorByEmail(
        updateUserDTO.email
      );

      if (emailAlreadyUse) {
        return this.exceptionAdapter.badRequest({
          message: "This email already use"
        });
      }
    }

    let hashPassword = user.getPassword();
    if (updateUserDTO.password) {
      hashPassword = await this.hashAdapter.generateHash(
        updateUserDTO.password
      );
    }

    user.setEmail(updateUserDTO.email || user.getEmail());
    user.setPassword(hashPassword);

    return await this.donorRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const donor = await this.donorRepository.findById(id);
    if (!donor) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    return await this.donorRepository.delete(id);
  }
}
