import {
  CompareParams,
  CryptographyAdapter
} from "@domain/adapters/cryptography";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptIntegration implements CryptographyAdapter {
  private HASH_SALT = 8;

  async compare(params: CompareParams): Promise<boolean> {
    const { encryptText, plainText } = params;

    return compare(plainText, encryptText);
  }

  async generateHash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT);
  }
}
