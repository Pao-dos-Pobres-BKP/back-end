import { BaseEntity } from "./base";
import { UserRole } from "./role";

export class User extends BaseEntity {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  cpf: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}
