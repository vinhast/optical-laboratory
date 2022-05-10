import IPickOrder from '../dtos/IPickOrderDTO';

export default interface IPickOrderRepository {
  findOne(id: number, userId: number): Promise<IPickOrder>;
}
