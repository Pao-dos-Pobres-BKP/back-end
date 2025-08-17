import { Injectable } from "@nestjs/common";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { User } from "@domain/entities/user";
import { CreateUserDTO } from "@application/dtos/user/create";
import { UpdateUserDTO } from "@application/dtos/user/update";
import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";

@Injectable()
export class UserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionAdapter: ExceptionsAdapter
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const findUser = await this.userRepository.findByEmail(user.email);

    if (findUser) {
      throw this.exceptionAdapter.badRequest({
        message: "Already exist user with this email"
      });
    }
  }

  /*
    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw this.exceptionAdapter.notFound("User not found");
        }
        return user;
    }

    async findAllUsers(params: PaginationParams): Promise<PaginatedEntity<User>> {
        return this.userRepository.findAll(params);
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw this.exceptionAdapter.notFound("User not found");
        }
        const updatedUser = new User({ ...user, ...updateUserDTO }, id, user.getUpdatedAt());
        return this.userRepository.update(id, updatedUser);
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw this.exceptionAdapter.notFound("User not found");
        }
        return this.userRepository.delete(id);
    }
    */
}
