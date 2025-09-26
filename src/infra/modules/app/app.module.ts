import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DonorModule } from "../donor";
import { DonationModule } from "../donation";
import { AuthModule } from "../auth";
import { EventModule } from "../event";
import { AdminModule } from "../admin";
import { MailModule } from "../mail";
import { FileModule } from "../file";
import { NewsModule } from "../news";
//import { MetricsModule } from "../metrics";
import { CampaignModule } from "../campaign";

//Metrics Module está quebrada.

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
    NewsModule,
    //MetricsModule,
    FileModule,
    MailModule,
    NewsModule,
    CampaignModule
  ]
})
export class AppModule {}
