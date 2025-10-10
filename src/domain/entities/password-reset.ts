export class PasswordResetToken {
  id: string;
  tokenHash: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}
