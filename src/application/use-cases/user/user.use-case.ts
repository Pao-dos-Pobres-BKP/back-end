import { Injectable } from "@nestjs/common";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { User } from "@domain/entities/user";
import { CreateUserDTO } from "@application/dtos/user/create";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { UpdateUserDTO } from "@application/dtos/user/update";
import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";

@Injectable()
export class UserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionAdapter: ExceptionsAdapter,
    private readonly hashAdapter: CryptographyAdapter
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const findUser = await this.userRepository.findUserByEmail(user.email);

    if (findUser) {
      throw this.exceptionAdapter.badRequest({
        message: "Already exist user with this email"
      });
    }

    const hashedPassword = await this.hashAdapter.generateHash(user.password);
    const newUser = new User({
      email: user.email,
      password: hashedPassword
    });
    return await this.userRepository.create(newUser);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    return user;
  }

  async findAllPaginated({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<User>> {
    return await this.userRepository.findAllUsers({
      page,
      pageSize
    });
  }

  async updateUser(
    id: string,
    updateUserDTO: UpdateUserDTO
  ): Promise<User | void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    if (updateUserDTO.email) {
      const emailAlreadyUse = await this.userRepository.findUserByEmail(
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

    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw this.exceptionAdapter.notFound({ message: "User not found" });
    }
    return await this.userRepository.delete(id);
  }
}
