import { inject, injectable } from 'tsyringe';

import StockMoviments from '@modules/warehouse/infra/typeorm/entities/StockMoviments';
import IStockMoviments from '@modules/warehouse/repositories/IStockMoviments';
import ICreateStockMovimentsDTO from '@modules/warehouse/dtos/ICreateStockMovimentsDTO';

@injectable()
class CreateService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMoviments,
  ) {}

  public async execute(dto: ICreateStockMovimentsDTO): Promise<StockMoviments> {
    const result = await this.stockMovimentsRepository.create(dto);

    return result;
  }
}

export default CreateService;
