import { QueueAdapter } from "@domain/adapters/queue";
import { christmasTemplate } from "@domain/email-templates/email-template";
import { DonorRepository } from "@domain/repositories/donor";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendChristmasMailUseCase {
  constructor(
    private readonly queueIntegration: QueueAdapter,
    private readonly donorRepository: DonorRepository
  ) {}

  async execute(): Promise<void> {
    const donors = await this.donorRepository.findAllDonorsMails();

    const title = "Feliz Natal";
    console.log("Preparing to send Christmas mails to donors:", donors.length);

    for (const donor of donors) {
      console.log("Sending Christmas mail to:", donor.email);
      await this.queueIntegration.addJob({
        to: donor.email,
        subject: title,
        body: christmasTemplate(title, donor.fullName)
      });
      console.log("Christmas mail queued for:", donor.email);
    }
    console.log("Sending of Christmas mails completed.");
  }
}
