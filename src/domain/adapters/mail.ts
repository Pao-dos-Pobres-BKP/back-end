export abstract class MailAdapter {
  abstract sendMail(to: string, subject: string, body: string): Promise<void>;
}
