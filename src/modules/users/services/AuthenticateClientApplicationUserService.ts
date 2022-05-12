import { sign } from 'jsonwebtoken';
import { inject, injectable, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import MountMenuUserService from '@modules/users/services/MountMenuUserService';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '../infra/typeorm/entities/ClientApplicationUser';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  clientApplicationUser: ClientApplicationUser;
  token: string;
  menus: IMenu[];
}

interface IMenu {
  id: number;
  parent_id?: number;
  method?: string;
  name: string;
  url?: string;
  permission: boolean;
  children?: IMenu[];
}

@injectable()
class AuthenticateClientApplicationUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByUsername(username);

    if (!clientApplicationUser) {
      throw new AppError('Incorret username/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      clientApplicationUser.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorret username/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const subject = `${clientApplicationUser.id}#${clientApplicationUser.role_id}#${clientApplicationUser.client_application_id}`;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    const mountMenuUser = container.resolve(MountMenuUserService);
    const menuUser = await mountMenuUser.execute({
      user_id: clientApplicationUser.id,
      role_id: clientApplicationUser.role_id || 1,
    });

    return {
      clientApplicationUser,
      token,
      menus: menuUser,
    };
  }
}

export default AuthenticateClientApplicationUserService;
