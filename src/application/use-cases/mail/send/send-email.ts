import {
  SESv2Client,
  SendEmailCommand,
  SendEmailRequest,
  EmailContent
} from "@aws-sdk/client-sesv2";
import { SendEmailDTO } from "@application/dtos/mail/send";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SendEmailUseCase {
  private readonly from: string;
  private readonly defaultReplyTo?: string;

  constructor(
    private readonly ses: SESv2Client,
    private readonly cfg: ConfigService
  ) {
    this.from = this.cfg.get<string>("MAIL_FROM");
    this.defaultReplyTo = this.cfg.get<string>("MAIL_REPLY_TO");
  }

  // Example usage:
  //   {
  //   to: ['user@example.com'],
  //   subject: 'Welcome!',
  //   html: '<h1>Hi there</h1><p>Your account is ready.</p>',
  //   text: 'Hi there - your account is ready.',
  //   tags: [{ name: 'app', value: 'my-nest' }],
  // }
  async execute(mail: SendEmailDTO): Promise<void> {
    const to = Array.isArray(mail.to) ? mail.to : [mail.to];
    const cc = mail.cc
      ? Array.isArray(mail.cc)
        ? mail.cc
        : [mail.cc]
      : undefined;
    const bcc = mail.bcc
      ? Array.isArray(mail.bcc)
        ? mail.bcc
        : [mail.bcc]
      : undefined;
    const replyTo = mail.replyTo
      ? Array.isArray(mail.replyTo)
        ? mail.replyTo
        : [mail.replyTo]
      : this.defaultReplyTo
        ? [this.defaultReplyTo]
        : undefined;

    const content: EmailContent = {
      Simple: {
        Subject: { Data: mail.subject, Charset: "UTF-8" },
        Body: {
          ...(mail.html ? { Html: { Data: mail.html, Charset: "UTF-8" } } : {}),
          ...(mail.text ? { Text: { Data: mail.text, Charset: "UTF-8" } } : {})
        }
      }
    };

    const input: SendEmailRequest = {
      FromEmailAddress: this.from,
      Destination: {
        ToAddresses: to,
        CcAddresses: cc,
        BccAddresses: bcc
      },
      Content: content,
      ReplyToAddresses: replyTo,
      ConfigurationSetName: mail.configurationSetName,
      EmailTags: mail.tags?.map((t) => ({ Name: t.name, Value: t.value }))
    };

    await this.ses.send(new SendEmailCommand(input));
  }
}
