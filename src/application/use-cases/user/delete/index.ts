import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return this.exceptions.notFound({
        message: "User not found"
      });
    }

    await this.userRepository.delete(id);
  }
}
