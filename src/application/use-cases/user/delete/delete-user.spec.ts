import { UserRepository } from "@domain/repositories/user";
import { DeleteUserUseCase } from ".";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepositoryStub } from "@test/stubs/repositories/user-repositories-stub";
import { ExceptionsAdapterStub } from "@test/stubs/adapters/exceptions";
import { createMockUser } from "@test/builders/user";

describe("DeleteUserUseCase", () => {
  let sut: DeleteUserUseCase;
  let userRepository: UserRepository;
  let exception: ExceptionsAdapter;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    exception = new ExceptionsAdapterStub();
    sut = new DeleteUserUseCase(userRepository, exception);
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

  it("should delete user", async () => {
    const userMock = createMockUser();

    jest.spyOn(userRepository, "findById").mockResolvedValue(userMock);
    const deleteSpy = jest.spyOn(userRepository, "delete");

    await sut.execute(userMock.id);

    expect(deleteSpy).toHaveBeenCalledWith(userMock.id);
  });
});
