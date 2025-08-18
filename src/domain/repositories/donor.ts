import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";
import { Donor } from "@domain/entities/donor";

export abstract class DonorRepository {
  abstract create(donor: Donor): Promise<Donor>;
  abstract findById(id: string): Promise<Donor | null>;
  abstract findDonorByEmail(email: string): Promise<Donor | null>;
  abstract findAllDonors(
    params: PaginationParams
  ): Promise<PaginatedEntity<Donor>>;
  abstract update(id: string, donor: Donor): Promise<Donor>;
  abstract delete(id: string): Promise<boolean>;
}
