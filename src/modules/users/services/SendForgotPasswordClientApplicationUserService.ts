import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';

interface IRequest {
  username: string;
}

@injectable()
class SendForgotPasswordClientApplicationUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ username }: IRequest): Promise<void> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByUsername(username);
    if (!clientApplicationUser) {
      throw new AppError('Username not exists.');
    }

    const { secret, expiresIn, expiresInForgotToken } = authConfig.jwt;
    const subject = `${clientApplicationUser.id}#${clientApplicationUser.role_id}#${clientApplicationUser.client_application_id}`;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });
    const expiresDate = new Date(
      moment()
        .add(expiresInForgotToken, 'hour')
        .format('YYYY-MM-DDTHH:mm:ss[Z]'),
    );
    await this.clientsApplicationsUsersRepository.save({
      ...clientApplicationUser,
      token,
      token_validate: expiresDate,
    });

    const forgotPawwordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: clientApplicationUser.clientApplication.name,
        email: clientApplicationUser.clientApplication.email,
      },
      subject: '[opticalLaboratory] Recuperação de senha',
      templateData: {
        file: forgotPawwordTemplate,
        variables: {
          name: clientApplicationUser.clientApplication.name,
          link: `http://localhost:3000/reset_password=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordClientApplicationUserService;