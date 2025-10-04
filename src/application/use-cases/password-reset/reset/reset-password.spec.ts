import { Test, TestingModule } from "@nestjs/testing";
import { ResetPasswordUseCase } from "./reset-password";
import { DonorRepository } from "@domain/repositories/donor";
import { AdminRepository } from "@domain/repositories/admin";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ResetPassword", () => {
  let service: ResetPasswordUseCase;
  let donorRepository: Partial<DonorRepository>;
  let adminRepository: Partial<AdminRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let exceptions: ExceptionsServiceStub;

  const email = "test@example.com";
  const donorUser = { id: "donor-id", email };
  const adminUser = { id: "admin-id", email };
  const validToken = {
    id: "token-id",
    token: "hashed-code",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  };

  beforeEach(async () => {
    donorRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    };

    adminRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    };

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn(),
      markAsUsed: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordUseCase,
        { provide: DonorRepository, useValue: donorRepository },
        { provide: AdminRepository, useValue: adminRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(ResetPasswordUseCase);

    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password" as never);
  });

  it("should raise an exception if user is not found", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("User not found.");
  });

  it("should raise an exception if no valid token is found", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("No valid reset token found.");
  });

  it("should raise an exception if token has expired", async () => {
    const expiredToken = {
      ...validToken,
      expiresAt: new Date(Date.now() - 1000)
    };

    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expiredToken);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("The reset token has expired.");
  });

  it("should update the donor password and mark the token as used", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await service.execute({ email, newPassword: "newpass123" });

    expect(donorRepository.update).toHaveBeenCalledWith(donorUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.markAsUsed).toHaveBeenCalledWith(validToken.id);
  });

  it("should update the admin password and mark the token as used", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(adminUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await service.execute({ email, newPassword: "adminPass123" });

    expect(adminRepository.update).toHaveBeenCalledWith(adminUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.markAsUsed).toHaveBeenCalledWith(validToken.id);
  });
});
