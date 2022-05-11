import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  role_id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    role_id,
    name,
    username,
    email,
    password,
    active,
  }: IRequest): Promise<User> {
    let user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    user = await this.usersRepository.create({
      role_id,
      name,
      username,
      email,
      password: hashedPassword,
      active,
    });

    await this.cacheProvider.invalidate('users-list');

    return user;
  }
}

export default CreateUserService;
