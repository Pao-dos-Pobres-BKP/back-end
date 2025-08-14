import { UserWithoutPassword } from "@application/dtos/user/create";
import { UpdateUserDTO } from "@application/dtos/user/update";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(
    id: string,
    data: UpdateUserDTO
  ): Promise<UserWithoutPassword | void> {
    const { name, email, password, cpf, phone, address, city, state } = data;

    const user = await this.userRepository.findById(id);

    if (!user) {
      return this.exceptions.notFound({
        message: "User not found"
      });
    }

    const userUpdated = await this.userRepository.update(id, {
      ...user,
      name: name ?? user.name,
      email: email ?? user.email,
      password: password ?? user.password,
      cpf: cpf ?? user.cpf,
      phone: phone ?? user.phone,
      address: address ?? user.address,
      city: city ?? user.city,
      state: state ?? user.state,
      updatedAt: new Date()
    });

    return {
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      role: userUpdated.role,
      cpf: userUpdated.cpf,
      phone: userUpdated.phone,
      address: userUpdated.address,
      city: userUpdated.city,
      state: userUpdated.state,
      createdAt: userUpdated.createdAt,
      updatedAt: userUpdated.updatedAt
    };
  }
}
