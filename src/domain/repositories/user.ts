import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";
import { User } from "@domain/entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(params: PaginationParams): Promise<PaginatedEntity<User>>;
  abstract update(id: string, user: User): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
}
