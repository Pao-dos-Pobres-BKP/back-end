import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";

export class UserRepositoryStub implements UserRepository {
  findByEmail(): Promise<User | null> {
    return;
  }
  create(): Promise<User> {
    return;
  }
}
