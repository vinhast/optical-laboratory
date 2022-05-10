import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  name: string;
  abbreviation: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('UnitTypesRepository')
    private UnitTypesRepository: IUnitTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    abbreviation,
  }: IRequest): Promise<UnitType> {
    const cacheKey = `product-unit-type-get-${id}`;
    let unitType = await this.cacheProvider.recover<UnitType | undefined>(
      cacheKey,
    );

    if (!unitType) {
      unitType = await this.UnitTypesRepository.findById(id);
    }

    if (!unitType) {
      throw new AppError('Unit type not found.', 404);
    }

    unitType.name = name;
    unitType.abbreviation = abbreviation;

    await this.cacheProvider.invalidate('product-unit-type-list');
    await this.cacheProvider.invalidate(cacheKey);

    await this.UnitTypesRepository.save(unitType);

    return unitType;
  }
}

export default UpdateService;
