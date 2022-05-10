import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import Credit from '@modules/financial/infra/typeorm/entities/Credit';

@injectable()
class ListService {
  constructor(
    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Credit[]> {
    const cacheKey = `credits-list`;
    let credits = await this.cacheProvider.recover<Credit[]>(cacheKey);

    if (!credits) {
      credits = await this.creditsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(credits));
    }

    return credits;
  }
}

export default ListService;
