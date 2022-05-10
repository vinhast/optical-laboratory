import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  abbreviation: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('UnitTypesRepository')
    private unitTypesRepository: IUnitTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, abbreviation }: IRequest): Promise<UnitType> {
    let unitType = await this.unitTypesRepository.findByName(name);
    if (unitType) {
      throw new AppError('Unit type already exists.');
    }

    unitType = await this.unitTypesRepository.create({
      name,
      abbreviation,
    });

    await this.cacheProvider.invalidate('product-unit-type-list');

    return unitType;
  }
}

export default CreateService;
