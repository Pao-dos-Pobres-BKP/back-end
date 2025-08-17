export interface CompareParams {
  plainText: string;
  encryptText: string;
}

export abstract class CryptographyAdapter {
  abstract compare(params: CompareParams): Promise<boolean>;
  abstract generateHash(plainText: string): Promise<string>;
}
