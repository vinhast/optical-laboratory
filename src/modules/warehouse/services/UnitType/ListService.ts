import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('UnitTypesRepository')
    private unitTypesRepository: IUnitTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<UnitType[]> {
    const cacheKey = `product-unit-type-list`;
    let unitType = await this.cacheProvider.recover<UnitType[]>(cacheKey);

    if (!unitType) {
      unitType = await this.unitTypesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(unitType));
    }

    return unitType;
  }
}

export default ListService;
