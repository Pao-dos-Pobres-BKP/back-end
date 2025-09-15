import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";
import { Donation } from "@domain/entities/donation";
import {
  Periodicity,
  PaymentStatus,
  Prisma,
  PaymentMethod
} from "@prisma/client";

export interface CreateDonationParams {
  amount: number;
  periodicity?: Periodicity;
  campaignId?: string;
  donorId: string;
  payments?: {
    amount: Prisma.Decimal;
    status: PaymentStatus;
    paidAt: Date;
    paymentMethod: PaymentMethod;
  }[];
}

export interface UpdateDonationParams {
  amount?: number;
  periodicity?: Periodicity;
  campaignId?: string;
}

export interface DonationDetailsResponse {
  id: string;
  amount: number;
  periodicity?: Periodicity;
  campaignId?: string;
  donorId?: string;
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
