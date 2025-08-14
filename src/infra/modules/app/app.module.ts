import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    UserModule
  ]
})
export class AppModule {}
