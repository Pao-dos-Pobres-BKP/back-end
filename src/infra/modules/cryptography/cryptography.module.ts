import { Module } from "@nestjs/common";
import { CryptographyAdapter } from "src/domain/adapters/cryptography";
import { BcryptIntegration } from "src/infra/integrations/cryptography/index";

@Module({
  providers: [
    {
      provide: CryptographyAdapter,
      useClass: BcryptIntegration
    }
  ],
  exports: [CryptographyAdapter]
})
export class CryptographyModule {}
