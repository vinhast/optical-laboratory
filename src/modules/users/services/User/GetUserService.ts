import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<User> {
    const cacheKey = `user-get-${id}`;
    let user = await this.cacheProvider.recover<User | undefined>(cacheKey);

    if (!user) {
      user = await this.usersRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(user));
    }

    if (!user) {
      throw new AppError('user not found.', 404);
    }

    return user;
  }
}

export default GetUserService;
