import { Transaction } from "@domain/adapters/transaction";
import { User } from "@domain/entities/user";
import { UserRole } from "@domain/entities/user-role-enum";

export interface CreateUserParams {
  email: string;
  password: string;
  role: UserRole;
}

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(params: CreateUserParams, tx?: Transaction): Promise<User>;
}
