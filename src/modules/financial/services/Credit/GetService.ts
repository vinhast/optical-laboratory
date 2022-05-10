import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import Credit from '@modules/financial/infra/typeorm/entities/Credit';

@injectable()
class GetService {
  constructor(
    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Credit> {
    const cacheKey = `credit-get-${id}`;
    let credit = await this.cacheProvider.recover<Credit | undefined>(cacheKey);

    if (!credit) {
      credit = await this.creditsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(credit));
    }

    if (!credit) {
      throw new AppError('credit not found.', 404);
    }

    return credit;
  }
}

export default GetService;
