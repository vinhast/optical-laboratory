import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';
import ICreateFiscalSettingDTO from '@modules/financial/dtos/ICreateFiscalSettingDTO';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

@injectable()
class CreateService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingsRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(
    request: ICreateFiscalSettingDTO,
  ): Promise<FiscalSetting> {
    let filename;
    if (request.certified_file) {
      filename = await this.storageProvider.saveFile(request.certified_file);
    }

    const fiscalSetting = await this.fiscalSettingsRepository.create({
      ...request,
      certified_file: filename,
    });

    await this.cacheProvider.invalidate('fiscal-setting-list');

    return fiscalSetting;
  }
}

export default CreateService;
