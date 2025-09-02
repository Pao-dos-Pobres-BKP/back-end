import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";
import { Donation } from "@domain/entities/donation";

export interface CreateDonationParams {
  amount: number;
  periodicity?: string;
  impactArea?: string;
  campaignId?: string;
  donorId: string;
}

export interface UpdateDonationParams {
  amount?: number;
  periodicity?: string;
  impactArea?: string;
  campaignId?: string;
  status?: string;
}

export interface DonationDetailsResponse {
  id: string;
  amount: number;
  periodicity?: string;
  impactArea?: string;
  campaignId?: string;
  donorId: string;
  createdAt: Date;
}

export abstract class DonationRepository {
  abstract findById(id: string): Promise<Donation | null>;
  abstract findAllByDonor(
    donorId: string,
    params: PaginationParams
  ): Promise<PaginatedEntity<DonationDetailsResponse>>;
  abstract create(params: CreateDonationParams): Promise<void>;
  abstract update(id: string, params: UpdateDonationParams): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
