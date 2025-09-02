import { UpdateDonationUseCase } from "./update-donation";
import { DonationRepository } from "@domain/repositories/donation";
import { ExceptionsAdapter } from "@domain/adapters/exception";

describe("UpdateDonationUseCase", () => {
  let sut: UpdateDonationUseCase;
  let donationRepository: DonationRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    donationRepository = {
      findById: jest.fn(),
      findAllByDonor: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as DonationRepository;

    exceptionService = {
      notFound: jest.fn(),
      forbidden: jest.fn(),
      badRequest: jest.fn(),
      conflict: jest.fn(),
      internalServerError: jest.fn(),
      unauthorized: jest.fn()
    } as ExceptionsAdapter;

    sut = new UpdateDonationUseCase(donationRepository, exceptionService);
  });

  it("should throw an error when donation is not found", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue(null);

    await sut.execute("donation-id", "donor-id", { amount: 100 });

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Donation not found"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });

  it("should throw forbidden error when donation does not belong to donor", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "other-donor-id"
    });

    await sut.execute("donation-id", "donor-id", { amount: 100 });

    expect(exceptionService.forbidden).toHaveBeenCalledWith({
      message: "You can only update your own donations"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });

  it("should throw bad request error when amount is less than or equal to zero", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "donor-id"
    });

    await sut.execute("donation-id", "donor-id", { amount: 0 });

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Donation amount must be greater than zero"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });

  it("should update donation when data is valid and belongs to donor", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "donor-id"
    });

    await sut.execute("donation-id", "donor-id", {
      amount: 150,
      periodicity: "monthly"
    });

    expect(donationRepository.update).toHaveBeenCalledWith("donation-id", {
      amount: 150,
      periodicity: "monthly"
    });
    expect(exceptionService.notFound).not.toHaveBeenCalled();
    expect(exceptionService.forbidden).not.toHaveBeenCalled();
    expect(exceptionService.badRequest).not.toHaveBeenCalled();
  });
});
