import { PaymentMethod, PaymentStatus } from "@prisma/client";

export const donationsMockForPayments = [
  {
    id: "clx1a2b3c4d5e6f7g8h9i0j1k2l3m4n5",
    amount: 100.0,
    periodicity: null,
    donorId: null,
    campaignId: null
  },
  {
    id: "clx2b3c4d5e6f7g8h9i0j1k2l3m4n5o6",
    amount: 250.5,
    periodicity: null,
    donorId: null,
    campaignId: null
  },
  {
    id: "clx3c4d5e6f7g8h9i0j1k2l3m4n5o6p7",
    amount: 500.0,
    periodicity: null,
    donorId: null,
    campaignId: null
  },
  {
    id: "clx4d5e6f7g8h9i0j1k2l3m4n5o6p7q8",
    amount: 75.25,
    periodicity: null,
    donorId: null,
    campaignId: null
  },
  {
    id: "clx5e6f7g8h9i0j1k2l3m4n5o6p7q8r9",
    amount: 1000.0,
    periodicity: null,
    donorId: null,
    campaignId: null
  }
];

export const paymentsMock = [
  {
    id: "clx6f7g8h9i0j1k2l3m4n5o6p7q8r9s0",
    paymentMethod: PaymentMethod.PIX,
    status: PaymentStatus.CONFIRMED,
    amount: 100.0,
    paidAt: new Date("2025-01-15T10:00:00Z"),
    donationId: "clx1a2b3c4d5e6f7g8h9i0j1k2l3m4n5"
  },
  {
    id: "clx7g8h9i0j1k2l3m4n5o6p7q8r9s0t1",
    paymentMethod: PaymentMethod.PIX,
    status: PaymentStatus.CONFIRMED,
    amount: 250.5,
    paidAt: new Date("2025-02-20T14:30:00Z"),
    donationId: "clx2b3c4d5e6f7g8h9i0j1k2l3m4n5o6"
  },
  {
    id: "clx8h9i0j1k2l3m4n5o6p7q8r9s0t1u2",
    paymentMethod: PaymentMethod.CREDIT_CARD,
    status: PaymentStatus.CONFIRMED,
    amount: 500.0,
    paidAt: new Date("2025-03-10T16:45:00Z"),
    donationId: "clx3c4d5e6f7g8h9i0j1k2l3m4n5o6p7"
  },
  {
    id: "clx9i0j1k2l3m4n5o6p7q8r9s0t1u2v3",
    paymentMethod: PaymentMethod.BANK_SLIP,
    status: PaymentStatus.CONFIRMED,
    amount: 75.25,
    paidAt: new Date("2025-01-25T09:15:00Z"),
    donationId: "clx4d5e6f7g8h9i0j1k2l3m4n5o6p7q8"
  },
  {
    id: "clxa0j1k2l3m4n5o6p7q8r9s0t1u2v3w4",
    paymentMethod: PaymentMethod.PIX,
    status: PaymentStatus.CONFIRMED,
    amount: 1000.0,
    paidAt: new Date("2025-04-05T11:20:00Z"),
    donationId: "clx5e6f7g8h9i0j1k2l3m4n5o6p7q8r9"
  },
  {
    id: "clxb1k2l3m4n5o6p7q8r9s0t1u2v3w4x5",
    paymentMethod: PaymentMethod.CREDIT_CARD,
    status: PaymentStatus.PENDING,
    amount: 300.0,
    paidAt: null,
    donationId: "clx1a2b3c4d5e6f7g8h9i0j1k2l3m4n5"
  }
];
