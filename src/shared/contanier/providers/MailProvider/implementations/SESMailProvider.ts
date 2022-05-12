import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/contanier/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/contanier/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    cc,
    bcc,
    replyTo,
    templateData,
    attachments,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    await this.client.sendMail({
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
  }
}
