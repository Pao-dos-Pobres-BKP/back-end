import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DonorModule } from "../donor";
import { AuthModule } from "../auth";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    DonorModule,
    AuthModule
  ]
})
export class AppModule {}
