import { ExceptionsAdapter } from "@domain/adapters/exception";
import { AdminRepository } from "@domain/repositories/admin";
import { createMockAdmin } from "@test/builders/admin";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { AdminRepositoryStub } from "@test/stubs/repositories/admin";
import { DeleteAdminUseCase } from "./delete-admin";

describe("DeleteAdminUseCase", () => {
  let sut: DeleteAdminUseCase;
  let adminRepository: AdminRepository;
  let exceptionService: ExceptionsAdapter;

  beforeEach(() => {
    adminRepository = new AdminRepositoryStub();
    exceptionService = new ExceptionsServiceStub();
    sut = new DeleteAdminUseCase(adminRepository, exceptionService);
  });

  it("should throw an error when not found an admin with that id", async () => {
    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(adminRepository, "findById").mockResolvedValue(null);
    jest.spyOn(adminRepository, "delete");

    await sut.execute("example-admin-id");

    expect(exceptionService.notFound).toHaveBeenCalledWith({
      message: "Admin not found"
    });

    expect(adminRepository.delete).not.toHaveBeenCalled();
  });

  it("should delete an admin", async () => {
    const adminMock = createMockAdmin();

    jest.spyOn(exceptionService, "notFound");
    jest.spyOn(adminRepository, "findById").mockResolvedValue(adminMock);
    jest.spyOn(adminRepository, "delete");

    await sut.execute(adminMock.id);

    expect(adminRepository.delete).toHaveBeenCalledWith(adminMock.id);

    expect(exceptionService.notFound).not.toHaveBeenCalled();
  });
});
