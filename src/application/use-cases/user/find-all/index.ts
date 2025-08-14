import { UserWithoutPassword } from "@application/dtos/user/create";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { PaginatedEntity } from "@domain/constants/pagination";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    params: PaginationDTO
  ): Promise<PaginatedEntity<UserWithoutPassword>> {
    const users = await this.userRepository.findAll(params);

    return {
      data: users.data.map((user) => ({
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
      })),
      lastPage: users.lastPage,
      page: users.page,
      total: users.total
    };
  }
}
