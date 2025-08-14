import { UserWithoutPassword } from "@application/dtos/user/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindByIdUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(id: string): Promise<UserWithoutPassword | void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return this.exceptions.notFound({
        message: "User not found"
      });
    }

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
