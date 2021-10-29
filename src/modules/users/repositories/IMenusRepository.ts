import Menu from '@modules/users/infra/typeorm/entities/Menu';
import ICreateMenuDTO from '@modules/users/dtos/ICreateMenuDTO';

export default interface IMenusRepository {
  findAll(): Promise<Menu[]>;
  findById(id: number): Promise<Menu | undefined>;
  findByName(name: string): Promise<Menu | undefined>;
  create(data: ICreateMenuDTO): Promise<Menu>;
  save(menu: Menu): Promise<Menu>;
  delete(id: number): Promise<void>;
}
