import { FindTotalDonationAmountByPaymentMethodAndDateUseCase } from "./find-by-date";
import { TotalDonationAmountByPaymentMethodRepository } from "@domain/repositories/totalDonationAmountByPaymentMethod";
import {
  FindTotalDonationAmountByPaymentMethodAndDateDTO,
  FindTotalDonationAmountByPaymentMethodAndDateResponse
} from "@application/dtos/totalDonationAmountByPaymentMethod/find-by-date";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { PaymentMethod } from "@prisma/client";

describe("FindTotalDonationAmountByPaymentMethodAndDateUseCase", () => {
  let useCase: FindTotalDonationAmountByPaymentMethodAndDateUseCase;
  let repository: TotalDonationAmountByPaymentMethodRepository;
  let exceptionService: ExceptionsAdapter;

  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-12-31");

  const mockRepositoryResponse = {
    rangeDate: {
      startDate,
      endDate
    },
    totalDonationAmountByPaymentMethodAmount: [
      {
        paymentMethod: PaymentMethod.PIX,
        totalAmount: 5000,
        totalQuantity: 25
      },
      {
        paymentMethod: PaymentMethod.CREDIT_CARD,
        totalAmount: 10000,
        totalQuantity: 15
      },
      {
        paymentMethod: PaymentMethod.BANK_SLIP,
        totalAmount: 3000,
        totalQuantity: 10
      }
    ]
  };

  const expectedResponse: FindTotalDonationAmountByPaymentMethodAndDateResponse =
    {
      rangeDate: {
        startDate,
        endDate
      },
      data: [
        {
          paymentMethod: PaymentMethod.PIX,
          totalAmount: 5000,
          totalQuantity: 25
        },
        {
          paymentMethod: PaymentMethod.CREDIT_CARD,
          totalAmount: 10000,
          totalQuantity: 15
        },
        {
          paymentMethod: PaymentMethod.BANK_SLIP,
          totalAmount: 3000,
          totalQuantity: 10
        }
      ]
    };

  beforeEach(() => {
    repository = {
      findByDate: jest.fn().mockResolvedValue(mockRepositoryResponse)
    } as unknown as TotalDonationAmountByPaymentMethodRepository;

    exceptionService = {
      badRequest: jest.fn(),
      notFound: jest.fn(),
      forbidden: jest.fn(),
      conflict: jest.fn(),
      internalServerError: jest.fn(),
      unauthorized: jest.fn()
    } as ExceptionsServiceStub;

    useCase = new FindTotalDonationAmountByPaymentMethodAndDateUseCase(
      repository,
      exceptionService
    );
  });

  describe("execute", () => {
    it("should return total donation amount by payment method for valid date range", async () => {
      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate,
        endDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual(expectedResponse);
      expect(repository.findByDate).toHaveBeenCalledTimes(1);
      expect(repository.findByDate).toHaveBeenCalledWith(startDate, endDate);
      expect(exceptionService.badRequest).not.toHaveBeenCalled();
    });

    it("should allow start date equal to end date", async () => {
      const sameDate = new Date("2025-06-15");
      const sameDateResponse = {
        rangeDate: {
          startDate: sameDate,
          endDate: sameDate
        },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 1000,
            totalQuantity: 2
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(sameDateResponse);

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate: sameDate,
        endDate: sameDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: {
          startDate: sameDate,
          endDate: sameDate
        },
        data: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 1000,
            totalQuantity: 2
          }
        ]
      });
      expect(repository.findByDate).toHaveBeenCalledWith(sameDate, sameDate);
      expect(exceptionService.badRequest).not.toHaveBeenCalled();
    });

    it("should return empty data when no donations found in date range", async () => {
      const emptyResponse = {
        rangeDate: { startDate, endDate },
        totalDonationAmountByPaymentMethodAmount: []
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(emptyResponse);

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate,
        endDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: { startDate, endDate },
        data: []
      });
      expect(repository.findByDate).toHaveBeenCalledWith(startDate, endDate);
    });

    it("should handle single day date range", async () => {
      const singleDate = new Date("2025-06-15");
      const singleDayResponse = {
        rangeDate: {
          startDate: singleDate,
          endDate: singleDate
        },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 500,
            totalQuantity: 1
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(singleDayResponse);

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate: singleDate,
        endDate: singleDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: {
          startDate: singleDate,
          endDate: singleDate
        },
        data: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 500,
            totalQuantity: 1
          }
        ]
      });
      expect(repository.findByDate).toHaveBeenCalledWith(
        singleDate,
        singleDate
      );
    });

    it("should handle only PIX payments", async () => {
      const pixOnlyResponse = {
        rangeDate: { startDate, endDate },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 15000,
            totalQuantity: 50
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(pixOnlyResponse);

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate,
        endDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: { startDate, endDate },
        data: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 15000,
            totalQuantity: 50
          }
        ]
      });
    });

    it("should handle only CREDIT_CARD payments", async () => {
      const creditCardOnlyResponse = {
        rangeDate: { startDate, endDate },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.CREDIT_CARD,
            totalAmount: 8000,
            totalQuantity: 12
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(
        creditCardOnlyResponse
      );

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate,
        endDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: { startDate, endDate },
        data: [
          {
            paymentMethod: PaymentMethod.CREDIT_CARD,
            totalAmount: 8000,
            totalQuantity: 12
          }
        ]
      });
    });

    it("should handle only BANK_SLIP payments", async () => {
      const bankSlipOnlyResponse = {
        rangeDate: { startDate, endDate },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.BANK_SLIP,
            totalAmount: 2500,
            totalQuantity: 5
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(
        bankSlipOnlyResponse
      );

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate,
        endDate
      };

      const result = await useCase.execute(dto);

      expect(result).toEqual({
        rangeDate: { startDate, endDate },
        data: [
          {
            paymentMethod: PaymentMethod.BANK_SLIP,
            totalAmount: 2500,
            totalQuantity: 5
          }
        ]
      });
    });

    it("should handle large date range spanning multiple years", async () => {
      const largeRangeStart = new Date("2021-01-01");
      const largeRangeEnd = new Date("2025-12-31");

      const largeRangeResponse = {
        rangeDate: {
          startDate: largeRangeStart,
          endDate: largeRangeEnd
        },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 100000,
            totalQuantity: 500
          },
          {
            paymentMethod: PaymentMethod.CREDIT_CARD,
            totalAmount: 200000,
            totalQuantity: 300
          },
          {
            paymentMethod: PaymentMethod.BANK_SLIP,
            totalAmount: 50000,
            totalQuantity: 100
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(
        largeRangeResponse
      );

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate: largeRangeStart,
        endDate: largeRangeEnd
      };

      const result = (await useCase.execute(
        dto
      )) as FindTotalDonationAmountByPaymentMethodAndDateResponse;

      expect(result).toBeDefined();
      expect(result.rangeDate.startDate).toEqual(largeRangeStart);
      expect(result.rangeDate.endDate).toEqual(largeRangeEnd);
      expect(result.data).toHaveLength(3);
      expect(repository.findByDate).toHaveBeenCalledWith(
        largeRangeStart,
        largeRangeEnd
      );
    });

    it("should handle different date objects with same date values", async () => {
      const startDateCopy = new Date("2025-01-01T00:00:00.000Z");
      const endDateCopy = new Date("2025-12-31T23:59:59.999Z");

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate: startDateCopy,
        endDate: endDateCopy
      };

      await useCase.execute(dto);

      expect(repository.findByDate).toHaveBeenCalledWith(
        startDateCopy,
        endDateCopy
      );
    });

    it("should preserve exact data structure from repository response", async () => {
      const specificResponse = {
        rangeDate: {
          startDate: new Date("2025-03-01"),
          endDate: new Date("2025-03-31")
        },
        totalDonationAmountByPaymentMethodAmount: [
          {
            paymentMethod: PaymentMethod.PIX,
            totalAmount: 1500.5,
            totalQuantity: 7
          }
        ]
      };

      (repository.findByDate as jest.Mock).mockResolvedValue(specificResponse);

      const dto: FindTotalDonationAmountByPaymentMethodAndDateDTO = {
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-31")
      };

      const result = (await useCase.execute(
        dto
      )) as FindTotalDonationAmountByPaymentMethodAndDateResponse;

      expect(result).toBeDefined();
      expect(result.rangeDate).toEqual(specificResponse.rangeDate);
      expect(result.data).toEqual(
        specificResponse.totalDonationAmountByPaymentMethodAmount
      );
      expect(result.data[0].totalAmount).toBe(1500.5);
      expect(result.data[0].totalQuantity).toBe(7);
      expect(result.data[0].paymentMethod).toBe(PaymentMethod.PIX);
    });
  });
});
