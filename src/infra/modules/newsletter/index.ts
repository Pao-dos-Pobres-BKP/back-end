import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/modules/database";
import { ExceptionModule } from "@infra/modules/exception";
import { NewsletterController } from "@infra/controllers/newsletter";
import { CreateNewsletterUseCase } from "@application/use-cases/newsletter/create/create-newsletter";

@Module({
  imports: [DatabaseModule, ExceptionModule],
  controllers: [NewsletterController],
  providers: [CreateNewsletterUseCase]
})
export class NewsletterModule {}
