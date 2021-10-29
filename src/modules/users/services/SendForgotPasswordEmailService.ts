import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';

interface IReaquest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IReaquest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email address not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPawwordTemplate = await path.resolve(
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
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        file: forgotPawwordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
