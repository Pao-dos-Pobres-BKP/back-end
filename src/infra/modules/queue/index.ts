import { QueueAdapter } from "@domain/adapters/queue";
import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { QueueIntegration } from "@infra/integrations/queue";
import { BullModule } from "@nestjs/bullmq";
import { EmailProcessor } from "@infra/workers/email";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT ?? 6379),
        password: process.env.REDIS_PASS
      }
    }),
    BullModule.registerQueue({ name: "email" })
  ],
  exports: [QueueAdapter, BullModule],
  providers: [
    EmailProcessor,
    {
      provide: QueueAdapter,
      useClass: QueueIntegration
    }
  ]
})
export class QueueModule {}
