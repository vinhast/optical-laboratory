import { getRepository, Repository } from 'typeorm';

import FiscalSetting from '@modules/financial/infra/typeorm/entities/FiscalSetting';
import ICreateFiscalSettingDTO from '@modules/financial/dtos/ICreateFiscalSettingDTO';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class FiscalSettingsRepository
  extends MainRepository
  implements IFiscalSettingsRepository
{
  private ormRepository: Repository<FiscalSetting>;

  constructor() {
    const repository = getRepository(FiscalSetting);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    fiscalSettingData: ICreateFiscalSettingDTO,
  ): Promise<FiscalSetting> {
    const fiscalSetting = this.ormRepository.create(fiscalSettingData);
    await this.ormRepository.save(fiscalSetting);
    return fiscalSetting;
  }

  public save(fiscalSetting: FiscalSetting): Promise<FiscalSetting> {
    return this.ormRepository.save(fiscalSetting);
  }
}

export default FiscalSettingsRepository;
