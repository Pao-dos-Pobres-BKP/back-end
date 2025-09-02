import { DonorRepository } from "@domain/repositories/donor";
import { FindAllDonorsUseCase } from "./find-all-donors";
import { DonorRepositoryStub } from "@test/stubs/repositories/donor";

describe("FindAllDonorsUseCase", () => {
  let sut: FindAllDonorsUseCase;
  let donorRepository: DonorRepository;

  beforeEach(() => {
    donorRepository = new DonorRepositoryStub();
    sut = new FindAllDonorsUseCase(donorRepository);
  });

  it("should return all donors paginated", async () => {
    const page = 1;
    const pageSize = 10;

    jest.spyOn(donorRepository, "findAll");

    await sut.execute({
      page,
      pageSize
    });

    expect(donorRepository.findAll).toHaveBeenCalledWith({ page, pageSize });
  });
});
