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

  public async execute({
    id,
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
    const cacheKey = `Campaing-get-${id}`;
    let orderProduct = await this.cacheProvider.recover<
      OrderProduct | undefined
    >(cacheKey);

    if (!orderProduct) {
      orderProduct = await this.orderProductsRepository.findById(id);
    }

    if (!orderProduct) {
      throw new AppError('orderProduct not found.', 404);
    }

    orderProduct.cashback_value = cashback_value;
    orderProduct.charged_value = charged_value;
    orderProduct.cfop = cfop;
    orderProduct.initial_price = initial_price;
    orderProduct.order_id = order_id;
    orderProduct.product_id = product_id;
    orderProduct.quantity = quantity;
    orderProduct.single_discount = single_discount;
    orderProduct.total_discount = total_discount;
    orderProduct.taxes = taxes;
    orderProduct.wrap = wrap;
    orderProduct.released = released;

    await this.cacheProvider.invalidate(`order-products-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.orderProductsRepository.save(orderProduct);

    return orderProduct;
  }
}

export default UpdateService;
