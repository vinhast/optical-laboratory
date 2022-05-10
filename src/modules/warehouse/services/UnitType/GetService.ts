import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('UnitTypesRepository')
    private unitTypesRepository: IUnitTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<UnitType> {
    const cacheKey = `product-unit-type-get-${id}`;
    let unitType = await this.cacheProvider.recover<UnitType | undefined>(
      cacheKey,
    );

    if (!unitType) {
      unitType = await this.unitTypesRepository.findById(id);
      await this.cacheProvider.save(cacheKey, classToClass(unitType));
    }

    if (!unitType) {
      throw new AppError('unit-type not found.', 404);
    }

    return unitType;
  }
}

export default GetService;
