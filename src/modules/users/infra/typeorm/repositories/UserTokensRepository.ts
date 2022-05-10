import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class UserTokensRepository
  extends MainRepository
  implements IUserTokensRepository
{
  private ormRepository: Repository<UserToken>;

  constructor() {
    const repository = getRepository(UserToken);
    super(repository);
    this.ormRepository = repository;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });
    return userToken;
  }

  public async generate(user_id: number): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
