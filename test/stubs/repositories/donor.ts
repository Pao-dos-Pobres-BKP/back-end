import { PaginatedEntity } from "@domain/constants/pagination";
import { Donor } from "@domain/entities/donor";
import {
  DonorDetailsResponse,
  DonorMailsResponse,
  DonorRepository,
  DonorWithUser
} from "@domain/repositories/donor";

export class DonorRepositoryStub implements DonorRepository {
  findAllDonorsMails(): Promise<DonorMailsResponse[]> {
    return;
  }
  findAllDonorsWithBirthday(): Promise<DonorMailsResponse[]> {
    return;
  }
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
