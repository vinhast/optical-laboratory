import { getRepository, Repository } from 'typeorm';

import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICreateUnitTypeDTO from '@modules/warehouse/dtos/ICreateUnitTypeDTO';

import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class UnitTypesRepository
  extends MainRepository
  implements IUnitTypesRepository
{
  private ormRepository: Repository<UnitType>;

  constructor() {
    const repository = getRepository(UnitType);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(unitTypeData: ICreateUnitTypeDTO): Promise<UnitType> {
    const unitType = this.ormRepository.create(unitTypeData);

    await this.ormRepository.save(unitType);

    return unitType;
  }

  public save(unitType: UnitType): Promise<UnitType> {
    return this.ormRepository.save(unitType);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UnitTypesRepository;
