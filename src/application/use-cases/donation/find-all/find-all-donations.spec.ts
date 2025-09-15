import { DonationRepository } from "@domain/repositories/donation";
import { FindAllDonationsUseCase } from "./find-all-donations";
import { DonationRepositoryStub } from "../../../../../test/stubs/repositories/donation";

describe("FindAllDonationsUseCase", () => {
  let sut: FindAllDonationsUseCase;
  let donationRepository: DonationRepository;

  beforeEach(() => {
    donationRepository = new DonationRepositoryStub();
    sut = new FindAllDonationsUseCase(donationRepository);
  });

  it("should return all donations paginated for the donor", async () => {
    const donorId = "donor-id";
    const page = 1;
    const pageSize = 10;

    jest.spyOn(donationRepository, "findAllByDonor");

    await sut.execute({
      donorId,
      page,
      pageSize
    });

    expect(donationRepository.findAllByDonor).toHaveBeenCalledWith(donorId, {
      page,
      pageSize
    });
  });
  it("should throw if donorId is not provided", async () => {
    await expect(sut.execute({ page: 1, pageSize: 10 })).rejects.toThrow(
      "Only authenticated donors can view donations."
    );
  });
});
