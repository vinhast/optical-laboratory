import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';

@injectable()
class ListService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FiscalSetting[]> {
    const cacheKey = `fiscal-settings-list`;
    let fiscalSetting = await this.cacheProvider.recover<FiscalSetting[]>(
      cacheKey,
    );

    if (!fiscalSetting) {
      fiscalSetting = await this.fiscalSettingRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(fiscalSetting));
    }

    return fiscalSetting;
  }
}

export default ListService;
