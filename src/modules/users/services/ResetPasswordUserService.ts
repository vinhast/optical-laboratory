import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import moment from 'moment';
import IUsersRepository from '../repositories/IUsersRepository';

interface IReaquest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IReaquest): Promise<void> {
    const user = await this.usersRepository.findByToken(token);

    if (!user) {
      throw new AppError('User token does not exists');
    }
    const { expiresInForgotToken } = authConfig.jwt;
    const [date, time] = `${user.token_validate}`.split(' ');
    const [day, month, year] = date.split('/');
    const expiresDate = moment(`${year}-${month}-${day} ${time}`);

    if (moment().diff(expiresDate, 'hour') > expiresInForgotToken) {
      throw new AppError('token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordUserService;
