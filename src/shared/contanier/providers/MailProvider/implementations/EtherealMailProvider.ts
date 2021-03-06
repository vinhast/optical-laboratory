import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/contanier/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/contanier/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    cc,
    bcc,
    replyTo,
    subject,
    templateData,
    attachments,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: to.email,
      cc,
      bcc,
      replyTo,
      subject,
      attachments,
      html: await this.mailTemplateProvider.paser(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
