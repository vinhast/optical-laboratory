import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class UsersRepository extends MainRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    const repository = getRepository(User);
    super(repository);
    this.ormRepository = repository;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username },
    });
    return user;
  }

  public async findByToken(token: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
