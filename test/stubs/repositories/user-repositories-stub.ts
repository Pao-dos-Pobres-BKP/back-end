import { PaginatedEntity } from "@domain/constants/pagination";
import { User } from "@domain/entities/donor";
import { UserRepository } from "@domain/repositories/donor";

export class UserRepositoryStub implements UserRepository {
  create(): Promise<User> {
    return;
  }

  findById(): Promise<User | null> {
    return;
  }

  findAll(): Promise<PaginatedEntity<User>> {
    return;
  }

  update(): Promise<User> {
    return;
  }

  delete(): Promise<boolean> {
    return;
  }

  findByEmail(): Promise<User | null> {
    return;
  }

  findByCPF(): Promise<User | null> {
    return;
  }
}
