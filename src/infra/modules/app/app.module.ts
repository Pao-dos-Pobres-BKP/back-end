import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    UserModule,
    CryptographyModule
  ]
})
export class AppModule {}
