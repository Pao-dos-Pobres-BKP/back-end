import { ResetPasswordUseCase } from "./reset-password";
import { DonorRepository } from "@domain/repositories/donor";
import { AdminRepository } from "@domain/repositories/admin";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ResetPassword", () => {
  let donorRepository: DonorRepository;
  let adminRepository: AdminRepository;
  let tokenRepository: PasswordResetTokenRepository;
  let exceptions: ExceptionsServiceStub;
  let useCase: ResetPasswordUseCase;

  const email = "test@example.com";
  const donorUser = { id: "donor-id", email };
  const adminUser = { id: "admin-id", email };
  const validToken = {
    id: "token-id",
    token: "hashed-code",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  };

  beforeEach(() => {
    donorRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    } as unknown as DonorRepository;

    adminRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    } as unknown as AdminRepository;

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn(),
      markAsUsed: jest.fn()
    } as unknown as PasswordResetTokenRepository;

    exceptions = new ExceptionsServiceStub();

    useCase = new ResetPasswordUseCase(
      tokenRepository,
      donorRepository,
      adminRepository,
      exceptions
    );

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "hashed-password");
    jest.spyOn(tokenRepository, "deleteUsedCode");
  });

  it("should throw if user not found", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    jest.spyOn(exceptions, "notFound").mockImplementation(() => {
      throw new Error("Usuário não encontrado.");
    });

    await expect(
      useCase.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("Usuário não encontrado.");
  });

  it("should throw if no valid token found", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    jest.spyOn(exceptions, "badRequest").mockImplementation(() => {
      throw new Error("Nenhum código de recuperação válido encontrado.");
    });

    await expect(
      useCase.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("Nenhum código de recuperação válido encontrado.");
  });

  it("should throw if token expired", async () => {
    const expired = { ...validToken, expiresAt: new Date(Date.now() - 1000) };
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expired);

    jest.spyOn(exceptions, "badRequest").mockImplementation(() => {
      throw new Error("O código de recuperação expirou.");
    });

    await expect(
      useCase.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("O código de recuperação expirou.");
  });

  it("should update donor password and mark token used", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await useCase.execute({ email, newPassword: "newpass123" });

    expect(donorRepository.update).toHaveBeenCalledWith(donorUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.deleteUsedCode).toHaveBeenCalledWith(validToken.id);
  });

  it("should update admin password and mark token used", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(adminUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await useCase.execute({ email, newPassword: "adminPass123" });

    expect(adminRepository.update).toHaveBeenCalledWith(adminUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.deleteUsedCode).toHaveBeenCalledWith(validToken.id);
  });
});
