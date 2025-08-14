import { FindByIdUserUseCase } from ".";

import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepositoryStub } from "@test/stubs/repositories/user-repositories-stub";
import { ExceptionsAdapterStub } from "@test/stubs/adapters/exceptions";

import { createMockUser } from "@test/builders/user";

describe("FindUserByIdUseCase", () => {
  let sut: FindByIdUserUseCase;
  let userRepository: UserRepository;
  let exception: ExceptionsAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    exception = new ExceptionsAdapterStub();
    sut = new FindByIdUserUseCase(userRepository, exception);
  });

  it("should throw an error if user not found", async () => {
    const userMock = createMockUser();

    jest.spyOn(exception, "notFound");
    jest.spyOn(userRepository, "findById").mockResolvedValue(null);

    await sut.execute(userMock.id);

    expect(exception.notFound).toHaveBeenCalledWith({
      message: "User not found"
    });
  });

  it("should find user", async () => {
    const userMock = createMockUser();

    const findByIdSpy = jest
      .spyOn(userRepository, "findById")
      .mockResolvedValue(userMock);

    const result = await sut.execute(userMock.id);

    expect(findByIdSpy).toHaveBeenCalledWith(userMock.id);

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
