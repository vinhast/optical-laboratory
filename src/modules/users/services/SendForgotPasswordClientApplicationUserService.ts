import { inject, injectable } from 'tsyringe';
import path from 'path';
import 'dotenv/config';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordClientApplicationUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByEmail(email);
    if (!clientApplicationUser) {
      throw new AppError('Username not exists.');
    }

    const { secret, expiresIn, expiresInForgotToken } = authConfig.jwt;
    const subject = `${clientApplicationUser.id}#${clientApplicationUser.client_application_role_id}#${clientApplicationUser.client_application_id}`;
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
    if (!clientApplicationUser.clientApplication) {
      throw new AppError('Client Application invalid');
    }
    await this.mailProvider.sendMail({
      to: {
        name: clientApplicationUser.clientApplication?.name,
        email: clientApplicationUser.clientApplication?.email,
      },
      subject: '[opticalLaboratory] Recuperação de senha',
      templateData: {
        file: forgotPawwordTemplate,
        variables: {
          name: clientApplicationUser.clientApplication?.name,
          link: `${process.env.APP_WEB_URL}/forgot?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordClientApplicationUserService;
