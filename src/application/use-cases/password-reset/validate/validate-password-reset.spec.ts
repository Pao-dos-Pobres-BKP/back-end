import { Test, TestingModule } from "@nestjs/testing";
import { ValidatePasswordResetUseCase } from "./validate-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ValidatePasswordReset", () => {
  let service: ValidatePasswordResetUseCase;
  let userRepository: Partial<UserRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let exceptions: ExceptionsServiceStub;

  const email = "test@example.com";
  const user = { id: "user-id", email };
  const code = "123456";
  const hashedCode = "hashed-code";

  const validToken = {
    id: "token-id",
    token: hashedCode,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn()
    };

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidatePasswordResetUseCase,
        { provide: UserRepository, useValue: userRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(ValidatePasswordResetUseCase);

    jest.spyOn(bcrypt, "compare").mockImplementation(async (raw, hashed) => {
      return raw === code && hashed === hashedCode;
    });
  });

  it("should raise an exception if user is not found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(email, code)).rejects.toThrow(
      "User not found."
    );
  });

  it("should raise an exception if no valid token is found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.execute(email, code)).rejects.toThrow(
      "No valid reset request found."
    );
  });

  it("should raise an exception if the token is invalid", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(service.execute(email, "wrong-code")).rejects.toThrow(
      "Invalid token."
    );
  });

  it("should raise an exception if the token is expired", async () => {
    const expiredToken = {
      ...validToken,
      expiresAt: new Date(Date.now() - 1000)
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expiredToken);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    await expect(service.execute(email, code)).rejects.toThrow(
      "The reset token has expired."
    );
  });

  it("should validate correctly if token is valid and not expired", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    await expect(service.execute(email, code)).resolves.toBeUndefined();
  });
});
