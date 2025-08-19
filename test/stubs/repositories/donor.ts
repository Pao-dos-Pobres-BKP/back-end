import { Donor } from "@domain/entities/donor";
import { DonorRepository } from "@domain/repositories/donor";

export class DonorRepositoryStub implements DonorRepository {
  findByCPF(): Promise<Donor | null> {
    return;
  }
  create(): Promise<Donor> {
    return;
  }
}
