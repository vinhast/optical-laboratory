import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
}

@injectable()
class SendForgotPasswordUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ username }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) {
      throw new AppError('Username not exists.');
    }

    const { secret, expiresIn, expiresInForgotToken } = authConfig.jwt;
    const subject = `${user.id}#${user.role_id}`;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });
    const expiresDate = new Date(
      moment()
        .add(expiresInForgotToken, 'hour')
        .format('YYYY-MM-DDTHH:mm:ss[Z]'),
    );

    user.token = token;
    user.token_validate = expiresDate;

    await this.usersRepository.save(user);

    const forgotPawwordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[opticalLaboratory] Recuperação de senha',
      templateData: {
        file: forgotPawwordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_MANAGER_URL}/forgot?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordUserService;
