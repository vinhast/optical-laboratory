import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';

interface IRequest {
  id: number;
  role_id: number;
  name: string;
  email: string;
  username: string;
  active: boolean;
  password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    role_id,
    name,
    email,
    username,
    active,
    password,
  }: IRequest): Promise<User> {
    const cacheKey = `user-get-${id}`;
    let user = await this.cacheProvider.recover<User | undefined>(cacheKey);

    if (!user) {
      user = await this.usersRepository.findById(id);
    }

    if (!user) {
      throw new AppError('user not found.', 404);
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await this.hashProvider.generateHash(password);
    }

    user.role_id = role_id;
    user.name = name;
    user.email = email;
    user.username = username;
    user.active = active;
    if (hashedPassword) user.password = hashedPassword;

    await this.cacheProvider.invalidate(`users-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
