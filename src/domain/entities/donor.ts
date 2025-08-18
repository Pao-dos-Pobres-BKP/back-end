import { BaseEntity } from "./base";
import { UserRole } from "./role";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}
export interface DonorInterface {
  fullname: string;
  birthDath: Date;
  phone?: string;
  gender: Gender;
  email: string;
  password: string;
  role?: UserRole;
}
export class Donor extends BaseEntity {
  fullname: string;
  birthDath: Date;
  phone?: string;
  gender: Gender;
  email: string;
  password: string;
  role: UserRole;

  constructor(donor: DonorInterface, id?: string, updatedAt?: Date) {
    super(id, updatedAt);
    this.fullname = donor.fullname;
    this.birthDath = donor.birthDath;
    this.phone = donor.phone;
    this.gender = donor.gender;
    this.email = donor.email;
    this.password = donor.password;
    this.role = donor.role ?? UserRole.BASIC;
  }

  public getFullname(): string {
    return this.fullname;
  }
  public setFullname(fullname: string): void {
    this.fullname = fullname;
  }
  public getBirthDath(): Date {
    return this.birthDath;
  }
  public setBirthDath(birthDath: Date): void {
    this.birthDath = birthDath;
  }
  public getPhone(): string | undefined {
    return this.phone;
  }
  public setPhone(phone: string): void {
    this.phone = phone;
  }
  public getGender(): Gender {
    return this.gender;
  }
  public setGender(gender: Gender): void {
    this.gender = gender;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getRole(): UserRole {
    return this.role;
  }
  public setRole(role: UserRole): void {
    this.role = role;
  }

  public toJSON(): object {
    return {
      id: this.getId(),
      fullname: this.getFullname(),
      birthDath: this.getBirthDath(),
      phone: this.getPhone(),
      gender: this.getGender(),
      email: this.getEmail(),
      role: this.getRole(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt()
    };
  }
}
