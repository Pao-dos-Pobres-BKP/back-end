import { Transaction } from "@domain/adapters/transaction";
import { Donor } from "@domain/entities/donor";
import { Gender } from "@domain/entities/gender-enum";

export interface CreateDonorParams {
  fullName: string;
  birthDate: Date;
  gender: Gender;
  phone: string;
  cpf: string;
}

export abstract class DonorRepository {
  abstract findByCPF(cpf: string): Promise<Donor | null>;
  abstract create(params: CreateDonorParams, tx?: Transaction): Promise<Donor>;
}
