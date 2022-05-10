import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    await this.cacheProvider.invalidate(`orders-list`);

    await this.ordersRepository.delete(id);

    return true;
  }
}

export default DeleteService;
