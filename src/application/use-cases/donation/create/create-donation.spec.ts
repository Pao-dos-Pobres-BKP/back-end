import { CreateDonationUseCase } from "./create-donation";
import { DonationRepository } from "@domain/repositories/donation";
import { DonorRepository } from "@domain/repositories/donor";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { CreateDonationDTO } from "@application/dtos/donation/create";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { DonationRepositoryStub } from "@test/stubs/repositories/donation";
import { Periodicity } from "@domain/entities/periodicity-enum";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

describe("CreateDonationUseCase", () => {
  let useCase: CreateDonationUseCase;
  let donationRepository: DonationRepository;
  let donorRepository: DonorRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    donationRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAllByDonor: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllByCampaign: jest.fn()
    } as DonationRepositoryStub;

    donorRepository = {
      findById: jest
        .fn()
        .mockResolvedValue({ id: "donor-id", name: "Test Donor" })
    } as unknown as DonorRepository;

    exceptionService = {
      badRequest: jest.fn(),
      notFound: jest.fn(),
      forbidden: jest.fn(),
      conflict: jest.fn(),
      internalServerError: jest.fn(),
      unauthorized: jest.fn()
    } as ExceptionsServiceStub;

    useCase = new CreateDonationUseCase(
      donationRepository,
      donorRepository,
      exceptionService
    );
  });

  it("should create a valid donation", async () => {
    const dto: CreateDonationDTO = {
      amount: 100,
      periodicity: Periodicity.MONTHLY,
      paymentMethod: PaymentMethod.PIX
    };

    await useCase.execute(dto, "donor-id");

    expect(donationRepository.create).toHaveBeenCalledWith({
      amount: 100,
      periodicity: Periodicity.MONTHLY,
      donorId: "donor-id",
      payments: expect.arrayContaining([
        expect.objectContaining({
          paymentMethod: PaymentMethod.PIX,
          status: PaymentStatus.CONFIRMED
        }),
        expect.objectContaining({
          paymentMethod: PaymentMethod.PIX,
          status: PaymentStatus.PENDING
        })
      ])
    });
  });

  it("should return error if amount is less than or equal to zero", async () => {
    const dto: CreateDonationDTO = {
      amount: 0,
      periodicity: Periodicity.MONTHLY,
      paymentMethod: PaymentMethod.PIX
    };

    await useCase.execute(dto, "donor-id");

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Donation amount must be greater than zero"
    });

    expect(donationRepository.create).not.toHaveBeenCalled();
  });

  it("should pass optional fields correctly", async () => {
    const dto: CreateDonationDTO = {
      amount: 50,
      periodicity: Periodicity.MONTHLY,
      campaignId: "campaign-123",
      paymentMethod: PaymentMethod.PIX
    };

    await useCase.execute(dto, "donor-id");

    expect(donationRepository.create).toHaveBeenCalledWith({
      amount: 50,
      periodicity: Periodicity.MONTHLY,
      campaignId: "campaign-123",
      donorId: "donor-id",
      payments: expect.arrayContaining([
        expect.objectContaining({
          paymentMethod: PaymentMethod.PIX,
          status: PaymentStatus.CONFIRMED
        }),
        expect.objectContaining({
          paymentMethod: PaymentMethod.PIX,
          status: PaymentStatus.PENDING
        })
      ])
    });
  });
});
