import { sign } from 'jsonwebtoken';
import { inject, injectable, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import MountMenuUserService from '@modules/users/services/MountMenuUserService';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  menus: Menu[];
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Incorret username/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorret username/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const subject = `${user.id}#${user.role_id}##User`;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    const mountMenuUser = container.resolve(MountMenuUserService);
    const menuUser = await mountMenuUser.execute({
      user_id: user.id,
      role_id: user.role_id,
    });

    return {
      user,
      token,
      menus: menuUser,
    };
  }
}

export default AuthenticateUserService;
