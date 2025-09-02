import { CreateDonationUseCase } from "./create-donation";
import { DonationRepository } from "@domain/repositories/donation";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { CreateDonationDTO } from "@application/dtos/donation/create";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";

describe("CreateDonationUseCase", () => {
  let useCase: CreateDonationUseCase;
  let donationRepository: DonationRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    donationRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAllByDonor: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as DonationRepository;

    exceptionService = new ExceptionsServiceStub();

    useCase = new CreateDonationUseCase(donationRepository, exceptionService);
  });

  it("should create a valid donation", async () => {
    const dto: CreateDonationDTO = {
      amount: 100,
      periodicity: "monthly"
    };
    await useCase.execute(dto, "donor-id");
    expect(donationRepository.create).toHaveBeenCalledWith({
      amount: 100,
      periodicity: "monthly",
      donorId: "donor-id"
    });
  });

  it("should return error if amount is less than or equal to zero", async () => {
    const dto: CreateDonationDTO = {
      amount: 0,
      periodicity: "monthly"
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
      periodicity: "monthly",
      impactArea: "Education",
      campaignId: "campaign-123"
    };
    await useCase.execute(dto, "donor-id");
    expect(donationRepository.create).toHaveBeenCalledWith({
      amount: 50,
      periodicity: "monthly",
      impactArea: "Education",
      campaignId: "campaign-123",
      donorId: "donor-id"
    });
  });
});
