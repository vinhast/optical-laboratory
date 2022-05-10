import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import Credit from '@modules/financial/infra/typeorm/entities/Credit';
import ICreateCreditDTO from '@modules/financial/dtos/ICreateCreditDTO';

@injectable()
class CreateService {
  constructor(
    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: ICreateCreditDTO): Promise<Credit> {
    const credit = await this.creditsRepository.create(request);

    await this.cacheProvider.invalidate('credits-list');

    return credit;
  }
}

export default CreateService;
