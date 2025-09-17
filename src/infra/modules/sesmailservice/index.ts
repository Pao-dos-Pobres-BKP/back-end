import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SESv2Client } from "@aws-sdk/client-sesv2";
import { SendEmailUseCase } from "@application/use-cases/sesmailservice/send/send-email";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: SESv2Client,
      useFactory: (cfg: ConfigService) =>
        new SESv2Client({
          region: cfg.get<string>("AWS_REGION")!
        }),
      inject: [ConfigService]
    },
    SendEmailUseCase
  ]
})
export class MailModule {}
