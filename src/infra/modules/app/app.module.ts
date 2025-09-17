import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DonorModule } from "../donor";
import { DonationModule } from "../donation";
import { AuthModule } from "../auth";
import { EventModule } from "../event";
import { AdminModule } from "../admin";
import { NewsModule } from "../news";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
  DonorModule,
  DonationModule,
    AuthModule,
    EventModule,
    AdminModule,
    NewsModule
  ]
})
export class AppModule {}
