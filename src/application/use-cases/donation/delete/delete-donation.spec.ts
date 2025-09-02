import { DeleteDonationUseCase } from "./delete-donation";
import { DonationRepository } from "@domain/repositories/donation";
import { ExceptionsAdapter } from "@domain/adapters/exception";

describe("DeleteDonationUseCase", () => {
  let useCase: DeleteDonationUseCase;
  let donationRepository: DonationRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    donationRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      findAllByDonor: jest.fn(),
      create: jest.fn(),
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

    useCase = new DeleteDonationUseCase(donationRepository, exceptionService);
  });

  it("should mark donation as canceled if it is recurring and belongs to donor", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "donor-id",
      periodicity: "monthly"
    });

    await useCase.execute("donation-id", "donor-id");

    expect(donationRepository.update).toHaveBeenCalledWith("donation-id", {
      status: "canceled"
    });
  });

  it("should return not found if donation does not exist", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue(null);

    await useCase.execute("donation-id", "donor-id");

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Donation not found"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });

  it("should return forbidden if donation does not belong to donor", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "other-donor-id",
      periodicity: "monthly"
    });

    await useCase.execute("donation-id", "donor-id");

    expect(exceptionService.forbidden).toHaveBeenCalledWith({
      message: "You can only delete your own donations"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });

  it("should return bad request if donation is not recurring", async () => {
    (donationRepository.findById as jest.Mock).mockResolvedValue({
      id: "donation-id",
      donorId: "donor-id",
      periodicity: null
    });

    await useCase.execute("donation-id", "donor-id");

    expect(exceptionService.badRequest).toHaveBeenCalledWith({
      message: "Donation is not recurring"
    });
    expect(donationRepository.update).not.toHaveBeenCalled();
  });
});
