import { PaginatedEntity } from "@domain/constants/pagination";
import { Donor } from "@domain/entities/donor";
import {
  DonorDetailsResponse,
  DonorRepository,
  DonorWithUser
} from "@domain/repositories/donor";

export class DonorRepositoryStub implements DonorRepository {
  async update(): Promise<void> {
    return;
  }
  findByIdWithUser(): Promise<DonorWithUser | null> {
    return;
  }
  findAll(): Promise<PaginatedEntity<DonorDetailsResponse>> {
    return;
  }
  findByEmail(): Promise<Donor | null> {
    return;
  }
  findById(): Promise<Donor | null> {
    return;
  }
  delete(): Promise<void> {
    return;
  }
  findByCPF(): Promise<Donor | null> {
    return;
  }
  create(): Promise<void> {
    return;
  }
}
