import { BaseEntity } from "./base";
import { UserRole } from "./user-role-enum";

export class User extends BaseEntity {
  email: string;
  password: string;
  role: UserRole;
}
