import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import Credit from '@modules/financial/infra/typeorm/entities/Credit';
import ICreateCreditDTO from '@modules/financial/dtos/ICreateCreditDTO';

interface IRequest extends ICreateCreditDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(creditUpdate: IRequest): Promise<Credit> {
    const id = creditUpdate.id;
    const cacheKey = `credit-get-${id}`;
    let credit = await this.cacheProvider.recover<Credit | undefined>(cacheKey);

    if (!credit) {
      credit = await this.creditsRepository.findById(id);
    }

    if (!credit) {
      throw new AppError('Credit not found.', 404);
    }

    credit = {
      ...credit,
      ...creditUpdate,
    };

    await this.cacheProvider.invalidate(`credits-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.creditsRepository.save(credit);

    return credit;
  }
}

export default UpdateService;
