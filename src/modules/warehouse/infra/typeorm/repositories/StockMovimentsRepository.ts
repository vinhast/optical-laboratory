import { getRepository, Repository } from 'typeorm';
import StockMoviments, {
  TypeDirectionMovimentation,
} from '@modules/warehouse/infra/typeorm/entities/StockMoviments';
import User from '@modules/users/infra/typeorm/entities/User';
import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';
import IStockMoviments, {
  ResponseCauculateStockMoviments,
} from '@modules/warehouse/repositories/IStockMoviments';
import ICreateStockMovimentsDTO from '@modules/warehouse/dtos/ICreateStockMovimentsDTO';

class StockMovimentsRepository implements IStockMoviments {
  private ormRepository: Repository<StockMoviments>;
  private ormRepositoryStock: Repository<Stock>;
  private ormRepositoryUser: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(StockMoviments);
    this.ormRepositoryStock = getRepository(Stock);
    this.ormRepositoryUser = getRepository(User);
  }

  async listAll(): Promise<ResponseCauculateStockMoviments[]> {
    const response = await this.ormRepository.query(
      `
    SELECT
    stock_id,
    SUM(COALESCE(CASE
    WHEN direction = 'out' THEN quantity
    END,
    0)) quantity_out,
    SUM(COALESCE(CASE
    WHEN direction = 'in' THEN quantity
    END,
    0)) quantity_in,
    SUM(COALESCE(CASE
    WHEN direction = 'in' THEN quantity
    END,
    0)) - SUM(COALESCE(CASE
    WHEN direction = 'out' THEN quantity
    END,
    0)) result_cauculate
    FROM
    stock_moviments
    GROUP BY stock_id`,
    );

    const responseResult: ResponseCauculateStockMoviments[] = [];

    if (response) {
      response.forEach(
        ({
          result_cauculate,
          stock_id,
        }: {
          stock_id: number;
          result_cauculate: number;
        }) => {
          responseResult.push({
            result_cauculate,
            stock_id,
          });
        },
      );
    }

    return responseResult;
  }
  async create({
    model,
    model_id,
    stock,
    user_id,
    warehouse_id,
    direction,
    status,
  }: ICreateStockMovimentsDTO): Promise<StockMoviments> {
    console.log('user id', user_id);
    const user = await this.ormRepositoryUser.findOne({
      where: { id: user_id },
    });

    if (stock && user) {
      const stockMoviments = new StockMoviments();
      stockMoviments.direction = direction;
      stockMoviments.model = model || '';
      stockMoviments.model_id = model_id || 0;
      stockMoviments.quantity = stock.current_stock;
      stockMoviments.stock_id = stock;
      stockMoviments.user_id = user;
      stockMoviments.warehouse_id = warehouse_id;
      stockMoviments.status = status;
      stockMoviments.user_down_id = user;
      stockMoviments.date_down = new Date();

      if (direction === TypeDirectionMovimentation.OUT) {
        const quantityStockMoviments = await this.ormRepository.findOne({
          where: { stock_id: stock.id },
        });
        if (
          quantityStockMoviments &&
          quantityStockMoviments.quantity < stock.current_stock
        ) {
          throw new Error('Quantidade solicitada inferior ao saldo do estoque');
        }
      }

      const saveStocks = await this.ormRepository.save(stockMoviments);
      if (saveStocks) {
        return saveStocks;
      }
    }

    throw new Error('Not save stock movimentation');
  }
}

export default StockMovimentsRepository;
