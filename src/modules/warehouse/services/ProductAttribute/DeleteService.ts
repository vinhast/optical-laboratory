import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `product-attribute-get-${id}`;
    const attribute = await this.productAttributesRepository.findById(id);

    if (!attribute) {
      throw new AppError('Attribute not found.', 404);
    }

    await this.cacheProvider.invalidate(`product-attribute-list`);
    await this.cacheProvider.invalidate(cacheKey);
    if (attribute.parent_id) {
      await this.cacheProvider.invalidate(
        `product-attribute-get-${attribute.parent_id}`,
      );
    }

    await this.productAttributesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
