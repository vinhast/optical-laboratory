import { sign } from 'jsonwebtoken';
import { inject, injectable, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import MountMenuUserService from '@modules/users/services/MountMenuUserService';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '../infra/typeorm/entities/ClientApplicationUser';

interface IRequest {
  email: string;
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

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByEmail(email);
    if (!clientApplicationUser) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      clientApplicationUser.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const subject = `${clientApplicationUser.id}#${clientApplicationUser.client_application_role_id}#${clientApplicationUser.client_application_id}#ClientApplicationUser`;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    const mountMenuUser = container.resolve(MountMenuUserService);
    const menuUser = await mountMenuUser.execute({
      user_id: clientApplicationUser.id,
      role_id: clientApplicationUser.client_application_role_id,
      userType: 'ClientApplicationUser',
      client_application_id: clientApplicationUser.client_application_id,
    });

    return {
      clientApplicationUser,
      token,
      menus: menuUser,
    };
  }
}

export default AuthenticateClientApplicationUserService;
