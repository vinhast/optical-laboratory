import IParseMailTemplateDTO from '@shared/contanier/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import Mail from 'nodemailer/lib/mailer';

interface IMailContactFrom {
  name: string;
  email: string;
}

interface IMailContactTo {
  name: string;
  email: string | string[];
}

export default interface ISendMailDTO {
  to: IMailContactTo;
  from?: IMailContactFrom;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  templateData: IParseMailTemplateDTO;
  attachments?: Mail.Attachment[];
}
