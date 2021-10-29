import ISendMailDTO from '@shared/contanier/providers/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
