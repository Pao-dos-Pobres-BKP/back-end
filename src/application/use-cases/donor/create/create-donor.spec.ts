import { ExceptionsAdapter } from "@domain/adapters/exception";
import { HashAdapter } from "@domain/adapters/hash";
import { TransactionAdapter } from "@domain/adapters/transaction";
import { DonorRepository } from "@domain/repositories/donor";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { HashServiceStub } from "@test/stubs/adapters/hash";
import { TransactionServiceStub } from "@test/stubs/adapters/transaction";
import { DonorRepositoryStub } from "@test/stubs/repositories/donor";
import { UserRepositoryStub } from "@test/stubs/repositories/users";
import { CreateDonorUseCase } from ".";
import { createMockUser } from "@test/builders/user";
import { createMockDonor } from "@test/builders/donor";

describe("CreateDonorUseCase", () => {
  let sut: CreateDonorUseCase;
  let userRepository: UserRepository;
  let donorRepository: DonorRepository;
  let hashService: HashAdapter;
  let exceptionService: ExceptionsAdapter;
  let transactionService: TransactionAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    donorRepository = new DonorRepositoryStub();
    hashService = new HashServiceStub();
    exceptionService = new ExceptionsServiceStub();
    transactionService = new TransactionServiceStub();
    sut = new CreateDonorUseCase(
      userRepository,
      donorRepository,
      hashService,
      exceptionService,
      transactionService
    );
  });

  it("should throw email already exists error if find email", async () => {
    const mockUser = createMockUser();

    jest.spyOn(exceptionService, "conflict");
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(mockUser);

    await sut.execute({
      birthDate: new Date(),
      cpf: "123.456.789-10",
      email: mockUser.email,
      fullName: "John Doe",
      gender: "MALE",
      password: "Senha@123",
      phone: "+5551999999999"
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);

    expect(exceptionService.conflict).toHaveBeenCalledWith({
      message: "Email already used"
    });
  });

  it("should throw cpf already exists error if find email", async () => {
    const mockDonor = createMockDonor();

    jest.spyOn(exceptionService, "conflict");
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);
    jest.spyOn(donorRepository, "findByCPF").mockResolvedValue(mockDonor);

    await sut.execute({
      birthDate: new Date(),
      cpf: mockDonor.cpf,
      email: "example@email.com",
      fullName: "John Doe",
      gender: "MALE",
      password: "Senha@123",
      phone: "+5551999999999"
    });

    expect(donorRepository.findByCPF).toHaveBeenCalledWith(mockDonor.cpf);

    expect(exceptionService.conflict).toHaveBeenCalledWith({
      message: "CPF already used"
    });
  });

  it("should create a donor", async () => {});
});
