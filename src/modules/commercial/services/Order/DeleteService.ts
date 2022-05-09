import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    await this.cacheProvider.invalidate(`order-list`);

    await this.orderRepository.delete(id);

    return true;
  }
}

export default DeleteService;
