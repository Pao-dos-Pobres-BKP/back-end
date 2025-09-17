import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DonorModule } from "../donor";
import { AuthModule } from "../auth";
import { EventModule } from "../event";
import { AdminModule } from "../admin";
import { NewsModule } from "../news";
import { CampaignModule } from "../campaign";
import { MailModule } from "../mail";
import { FileModule } from "../file";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    DonorModule,
    AuthModule,
    EventModule,
    AdminModule,
    NewsModule,
    CampaignModule,
    FileModule,
    MailModule
  ]
})
export class AppModule {}
