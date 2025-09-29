import {
  SendEmailDTO,
  SendEmailResponseDecorator
} from "@application/dtos/mail/send";
import { SendEmailUseCase } from "@application/use-cases/mail/send/send-email";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Mail")
@Controller("mail")
export class MailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Post("send")
  @SendEmailResponseDecorator
  async sendEmail(@Body() mail: SendEmailDTO): Promise<void> {
    await this.sendEmailUseCase.execute(mail);
  }
}
