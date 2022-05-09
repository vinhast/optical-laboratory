import { inject, injectable } from 'tsyringe';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';

interface IRequest {
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
class CreateService {
  constructor(
    @inject('OrderProductsRepository')
    private orderProductsRepository: IOrderProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    order_id,
    product_id,
    initial_price,
    single_discount,
    total_discount,
    charged_value,
    cashback_value,
    taxes,
    quantity,
    wrap,
    released,
    cfop,
  }: IRequest): Promise<OrderProduct> {
    const orderProduct = await this.orderProductsRepository.create({
      order_id,
      product_id,
      initial_price,
      single_discount,
      total_discount,
      charged_value,
      cashback_value,
      taxes,
      quantity,
      wrap,
      released,
      cfop,
    });

    await this.cacheProvider.invalidatePrefix(`order-product-list`);

    return orderProduct;
  }
}

export default CreateService;
