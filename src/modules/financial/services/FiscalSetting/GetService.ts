import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';

@injectable()
class GetService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingsRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FiscalSetting> {
    const cacheKey = `fiscal-setting-get-${id}`;
    let fiscalSetting = await this.cacheProvider.recover<
      FiscalSetting | undefined
    >(cacheKey);

    if (!fiscalSetting) {
      fiscalSetting = await this.fiscalSettingsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(fiscalSetting));
    }

    if (!fiscalSetting) {
      throw new AppError('fiscalSetting not found.', 404);
    }

    return fiscalSetting;
  }
}

export default GetService;
