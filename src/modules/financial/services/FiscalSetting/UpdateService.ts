import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';
import ICreateFiscalSettingDTO from '@modules/financial/dtos/ICreateFiscalSettingDTO';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest extends ICreateFiscalSettingDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingsRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(fiscalSettingUpdate: IRequest): Promise<FiscalSetting> {
    const id = fiscalSettingUpdate.id;
    const cacheKey = `fiscal-setting-get-${id}`;
    let fiscalSetting = await this.cacheProvider.recover<
      FiscalSetting | undefined
    >(cacheKey);

    if (!fiscalSetting) {
      fiscalSetting = await this.fiscalSettingsRepository.findById(id);
    }

    if (!fiscalSetting) {
      throw new AppError('FiscalSetting not found.', 404);
    }

    fiscalSetting = {
      ...fiscalSetting,
      ...fiscalSettingUpdate,
    };

    let filename;
    if (fiscalSettingUpdate.certified_file) {
      filename = await this.storageProvider.saveFile(
        fiscalSettingUpdate.certified_file,
      );
      fiscalSetting = {
        ...fiscalSetting,
        certified_file: filename,
      };
    }

    await this.cacheProvider.invalidate(`fiscal-settings-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.fiscalSettingsRepository.save(fiscalSetting);

    return fiscalSetting;
  }
}

export default UpdateService;
