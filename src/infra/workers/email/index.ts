import { SendEmailDTO } from "@application/dtos/mail/send";
import { MailAdapter } from "@domain/adapters/mail";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";

@Processor("email", { concurrency: 2 })
@Injectable()
export class EmailProcessor extends WorkerHost {
  constructor(private readonly mail: MailAdapter) {
    super();
  }

  async process(job: Job<SendEmailDTO>): Promise<void> {
    const data = job.data;

    await this.mail.sendMail(data.to, data.subject, data.html);
  }
}
