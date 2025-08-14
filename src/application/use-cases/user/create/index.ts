import {
  CreateUserDTO,
  UserWithoutPassword
} from "@application/dtos/user/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRole } from "@domain/entities/role";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exception: ExceptionsAdapter
  ) {}

  async execute({
    address,
    city,
    cpf,
    email,
    name,
    password,
    phone,
    state
  }: CreateUserDTO): Promise<UserWithoutPassword | void> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      return this.exception.conflict({
        message: "Email already exists"
      });
    }

    const cpfAlreadyExists = await this.userRepository.findByCPF(cpf);

    if (cpfAlreadyExists) {
      return this.exception.conflict({
        message: "CPF already exists"
      });
    }

    const user = await this.userRepository.create({
      id: randomUUID(),
      name,
      email,
      password,
      role: UserRole.BASIC,
      cpf,
      phone,
      address,
      city,
      state,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      cpf: user.cpf,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
