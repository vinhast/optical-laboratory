import IParseTemplateDTO from '@shared/contanier/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  paser(data: IParseTemplateDTO): Promise<string>;
}
