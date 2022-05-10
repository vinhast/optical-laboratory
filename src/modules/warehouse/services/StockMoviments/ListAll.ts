import { inject, injectable } from 'tsyringe';

import IStockMoviments, {
  ResponseCauculateStockMoviments,
} from '@modules/warehouse/repositories/IStockMoviments';

@injectable()
class CreateService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMoviments,
  ) {}

  public async execute(): Promise<ResponseCauculateStockMoviments[]> {
    const result = await this.stockMovimentsRepository.listAll();

    return result;
  }
}

export default CreateService;
