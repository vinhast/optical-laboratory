import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import moment from 'moment';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';

interface IReaquest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IReaquest): Promise<void> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByToken(token);

    if (!clientApplicationUser) {
      throw new AppError('Client application user token does not exists');
    }
    const { expiresInForgotToken } = authConfig.jwt;
    const [date, time] = `${clientApplicationUser.token_validate}`.split(' ');
    const [day, month, year] = date.split('/');
    const expiresDate = moment(`${year}-${month}-${day} ${time}`);

    if (moment().diff(expiresDate, 'hour') > expiresInForgotToken) {
      throw new AppError('token expired');
    }

    clientApplicationUser.password = await this.hashProvider.generateHash(
      password,
    );

    await this.clientsApplicationsUsersRepository.save(clientApplicationUser);
  }
}

export default ResetPasswordService;
