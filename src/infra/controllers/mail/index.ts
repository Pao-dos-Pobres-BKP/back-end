import {
  SendEmailDTO,
  SendEmailResponseDecorator
} from "@application/dtos/mail/send";
import { MailAdapter } from "@domain/adapters/mail";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Mail")
@Controller("mail")
export class MailController {
  constructor(private readonly mailIntegration: MailAdapter) {}

  @Post("send")
  @SendEmailResponseDecorator
  async sendEmail(@Body() mail: SendEmailDTO): Promise<void> {
    await this.mailIntegration.sendMail(mail.to, mail.subject, mail.html);
  }
}
