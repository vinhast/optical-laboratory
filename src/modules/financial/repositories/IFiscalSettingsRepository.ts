import ICreateFiscalSettingDTO from '../dtos/ICreateFiscalSettingDTO';
import FiscalSetting from '../infra/typeorm/entities/FiscalSetting';

export default interface IFiscalSettingsRepository {
  findAll(): Promise<FiscalSetting[]>;
  findById(id: number): Promise<FiscalSetting | undefined>;
  create(FiscalSetting: ICreateFiscalSettingDTO): Promise<FiscalSetting>;
  save(FiscalSetting: FiscalSetting): Promise<FiscalSetting>;
  delete(id: number): Promise<void>;
}
