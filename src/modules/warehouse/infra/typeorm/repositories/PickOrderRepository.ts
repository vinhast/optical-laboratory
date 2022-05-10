/* eslint-disable import/no-duplicates */
import IPickOrderRepository from '@modules/warehouse/repositories/IPickOrderRepository';
import IPickOrderDTO from '@modules/warehouse/dtos/IPickOrderDTO';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import OrdersProducts from '@modules/commercial/infra/typeorm/entities/OrdersProducts';

import { format } from 'date-fns';

class PickOrderRepository implements IPickOrderRepository {
  async findOne(id: number, userId: number): Promise<IPickOrderDTO> {
    const orderRepository = getRepository(Order);
    const userRepository = getRepository(User);

    const order = await orderRepository.findOne(id);
    const user = await userRepository.findOne(userId);

    const productRepository = getRepository(OrdersProducts);
    const products = await productRepository.find({ where: { order_id: id } });

    const parsedProducts = products.map(p => ({
      quantity: String(p.quantity),
      name: String(p.product_name),
    }));

    const batch = {
      label: 'ROMANEIO  DE SEPARAÇÃO:',
      value: '00001',
    };
    const orderId = { label: 'PEDIDO:', value: String(order?.id) };
    const date = {
      label: 'DATA DE IMPRESSÃO:',
      value: format(new Date(), 'dd/MM/yyyy HH:mm'),
    };

    const volume = String(order?.volume);
    const measure = '0,35 A X 0,35 L  X 0,90C';
    const weight = String(order?.weight);
    const organizer = 'RODRIGO';
    const checker = 'VANERSON';
    const note = String(order?.notes);

    return {
      products: parsedProducts,
      batch,
      order: orderId,
      date,
      volume,
      measure,
      weight,
      organizer,
      checker,
      note,
      user: user?.name || '',
    };
  }
}

export default PickOrderRepository;
