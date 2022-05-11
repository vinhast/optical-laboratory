import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';

interface IRequest {
  id: number;
  order_id: number;
  product_id: number;
  initial_price: string;
  single_discount?: string;
  total_discount?: string;
  charged_value: string;
  cashback_value?: string;
  taxes?: string;
  quantity: number;
  wrap?: boolean;
  released?: boolean;
  cfop?: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('OrderProductsRepository')
    private orderProductsRepository: IOrderProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(orderProductUpdate: IRequest): Promise<OrderProduct> {
    const id = orderProductUpdate.id;
    const cacheKey = `order-product-get-${id}`;
    let orderProduct = await this.cacheProvider.recover<
      OrderProduct | undefined
    >(cacheKey);

    if (!orderProduct) {
      orderProduct = await this.orderProductsRepository.findById(id);
    }

    if (!orderProduct) {
      throw new AppError('orderProduct not found.', 404);
    }

    orderProduct = {
      ...orderProduct,
      ...orderProductUpdate,
    };

    await this.cacheProvider.invalidate(`order-products-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.orderProductsRepository.save(orderProduct);

    return orderProduct;
  }
}

export default UpdateService;
