import { UserRepository } from "@domain/repositories/user";
import { CreateUserUseCase } from ".";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { ExceptionsAdapterStub } from "@test/stubs/adapters/exceptions";
import { UserRepositoryStub } from "@test/stubs/repositories/user-repositories-stub";
import { createMockUser } from "@test/builders/user";
import { UserRole } from "@domain/entities/role";

describe("CreateUserUseCase", () => {
  let sut: CreateUserUseCase;
  let userRepository: UserRepository;
  let exception: ExceptionsAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    exception = new ExceptionsAdapterStub();
    sut = new CreateUserUseCase(userRepository, exception);
  });

  it("should throw an error if user email already exists", async () => {
    const userMock = createMockUser();

    jest.spyOn(exception, "conflict");
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(userMock);
    jest.spyOn(userRepository, "create");

    await sut.execute({
      name: "any_name",
      email: userMock.email,
      password: "Senha@123",
      cpf: "85303050420",
      phone: "11999999999",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP"
    });

    expect(exception.conflict).toHaveBeenCalledWith({
      message: "Email already exists"
    });

    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if user cpf already exists", async () => {
    const userMock = createMockUser();

    jest.spyOn(exception, "conflict");
    jest.spyOn(userRepository, "findByCPF").mockResolvedValue(userMock);

    await sut.execute({
      name: "any_name",
      email: "any_email@gmail.com",
      password: "Senha@123",
      cpf: userMock.cpf,
      phone: "11999999999",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP"
    });

    expect(exception.conflict).toHaveBeenCalledWith({
      message: "CPF already exists"
    });
  });

  it("should create a user", async () => {
    const userMock = createMockUser({ role: UserRole.BASIC });

    jest.spyOn(userRepository, "findByCPF").mockResolvedValue(null);
    jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);
    jest.spyOn(userRepository, "create").mockResolvedValue(userMock);

    const result = await sut.execute({
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
      cpf: userMock.cpf,
      phone: userMock.phone,
      address: userMock.address,
      city: userMock.city,
      state: userMock.state
    });

    expect(userRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
      role: UserRole.BASIC,
      cpf: userMock.cpf,
      phone: userMock.phone,
      address: userMock.address,
      city: userMock.city,
      state: userMock.state,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });

    expect(result).toEqual({
      id: userMock.id,
      name: userMock.name,
      email: userMock.email,
      role: userMock.role,
      cpf: userMock.cpf,
      phone: userMock.phone,
      address: userMock.address,
      city: userMock.city,
      state: userMock.state,
      createdAt: userMock.createdAt,
      updatedAt: userMock.updatedAt
    });
  });
});
