import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';
import ICreateFiscalSettingDTO from '@modules/financial/dtos/ICreateFiscalSettingDTO';

@injectable()
class CreateService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingsRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateFiscalSettingDTO,
  ): Promise<FiscalSetting> {
    const fiscalSetting = await this.fiscalSettingsRepository.create(request);

    await this.cacheProvider.invalidate('fiscal-setting-list');

    return fiscalSetting;
  }
}

export default CreateService;
