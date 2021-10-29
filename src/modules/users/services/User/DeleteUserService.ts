import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('user not found.', 404);
    }

    await this.cacheProvider.invalidate(`users-list`);

    await this.usersRepository.delete(id);

    return true;
  }
}

export default DeleteUserService;
