import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DonorModule } from "../donor";
import { DonationModule } from "../donation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
  DonorModule,
  DonationModule
  ]
})
export class AppModule {}
