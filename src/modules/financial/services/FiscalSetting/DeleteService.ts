import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FiscalSettingsRepository')
    private fiscalSettingsRepository: IFiscalSettingsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const client = await this.fiscalSettingsRepository.findById(id);

    if (!client) {
      throw new AppError('fiscalSetting not found.', 404);
    }

    await this.cacheProvider.invalidate(`fiscal-settings-list`);
    await this.cacheProvider.invalidate(`fiscal-setting-get-${id}`);

    await this.fiscalSettingsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
