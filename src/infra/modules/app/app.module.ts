import { EnvConfig } from "@infra/config/env";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DonorModule } from "../donor";
import { AuthModule } from "../auth";
import { EventModule } from "../event";
import { AdminModule } from "../admin";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    DonorModule,
    AuthModule,
    EventModule,
    AdminModule
  ]
})
export class AppModule {}
