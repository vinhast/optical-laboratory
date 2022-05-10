import { Repository } from 'typeorm';
import httpContext from 'express-http-context';

class MainRepository {
  private ormMainRepository: Repository<any>;
  private user: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor(repository: Repository<any>) {
    this.ormMainRepository = repository;
    this.user = httpContext.get('user');
  }

  public async findById(id: number): Promise<any | undefined> {
    const item = await this.ormMainRepository.findOne({
      where: {
        id_key: id,
        client_application_id: this.user.client_application_id,
      },
    });
    return item;
  }

  public async findAll(): Promise<any[]> {
    const items = await this.ormMainRepository.find({
      where: {
        client_application_id: this.user.client_application_id,
      },
    });
    return items;
  }

  public async delete(id: number): Promise<void> {
    await this.ormMainRepository.delete(id);
  }
}

export default MainRepository;
