import { faker } from "@faker-js/faker";
import { Prisma, PaymentMethod, PaymentStatus } from "@prisma/client";

// Create payments mock with donation IDs
// We need to pass actual donation IDs after donations are created
export const createPaymentsMockWithIds = (
  donationIds: string[]
): Prisma.PaymentCreateInput[] => {
  const payments: Prisma.PaymentCreateInput[] = [];

  donationIds.forEach((donationId) => {
    // Each donation can have 1-3 payment attempts (for recurring donations or failed payments)
    const paymentCount = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < paymentCount; i++) {
      const paymentMethod = faker.helpers.arrayElement([
        PaymentMethod.PIX,
        PaymentMethod.BANK_SLIP,
        PaymentMethod.CREDIT_CARD
      ]);

      let status: PaymentStatus;
      let paidAt: Date | undefined;

      // Define status probabilities based on payment method
      if (paymentMethod === PaymentMethod.PIX) {
        // PIX payments are usually confirmed quickly or fail
        status = faker.helpers.weightedArrayElement([
          { weight: 0.85, value: PaymentStatus.CONFIRMED },
          { weight: 0.1, value: PaymentStatus.FAILED },
          { weight: 0.05, value: PaymentStatus.PENDING }
        ]) as PaymentStatus;
      } else if (paymentMethod === PaymentMethod.BANK_SLIP) {
        // Bank slip payments can take longer, more pending
        status = faker.helpers.weightedArrayElement([
          { weight: 0.7, value: PaymentStatus.CONFIRMED },
          { weight: 0.15, value: PaymentStatus.PENDING },
          { weight: 0.1, value: PaymentStatus.FAILED },
          { weight: 0.05, value: PaymentStatus.CANCELED }
        ]) as PaymentStatus;
      } else {
        // Credit card payments
        status = faker.helpers.weightedArrayElement([
          { weight: 0.75, value: PaymentStatus.CONFIRMED },
          { weight: 0.1, value: PaymentStatus.AUTHORIZED },
          { weight: 0.1, value: PaymentStatus.FAILED },
          { weight: 0.03, value: PaymentStatus.REFUNDED },
          { weight: 0.02, value: PaymentStatus.CANCELED }
        ]) as PaymentStatus;
      }

      // Set paidAt date if payment is confirmed, authorized, or refunded
      if (
        (
          [
            PaymentStatus.CONFIRMED,
            PaymentStatus.AUTHORIZED,
            PaymentStatus.REFUNDED
          ] as PaymentStatus[]
        ).includes(status)
      ) {
        paidAt = faker.date.between({
          from: new Date("2024-01-01"),
          to: new Date()
        });
      }

      // Generate amount (can be null for some payment statuses)
      let amount: number | undefined;
      if (status !== PaymentStatus.CANCELED) {
        amount = faker.number.float({
          min: 25,
          max: 5000,
          fractionDigits: 2
        });
      }

      const payment: Prisma.PaymentCreateInput = {
        paymentMethod,
        status,
        amount,
        paidAt,
        donation: {
          connect: {
            id: donationId
          }
        }
      };

      payments.push(payment);
    }
  });

  return payments;
};
