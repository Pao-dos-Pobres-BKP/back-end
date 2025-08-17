import { BaseEntity } from "./base";
import { UserRole } from "./role";

interface UserInterface {
  email: string;
  password: string;
  role?: UserRole;
}
export class User extends BaseEntity {
  email: string;
  password: string;
  role: UserRole;

  constructor(user: UserInterface, id?: string, updatedAt?: Date) {
    super(id, updatedAt);
    this.email = user.email;
    this.password = user.password;
    this.role = user.role ?? UserRole.BASIC;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
  public getEmail(): string {
    return this.email;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getPassword(): string {
    return this.password;
  }
  public setRole(role: UserRole): void {
    this.role = role;
  }
  public getRole(): UserRole {
    return this.role;
  }

  public toJSON(): object {
    return {
      id: this.getId(),
      email: this.getEmail(),
      role: this.getRole(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt()
    };
  }
}
