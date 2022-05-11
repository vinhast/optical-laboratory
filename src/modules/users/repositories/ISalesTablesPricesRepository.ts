import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import ICreateSaleTablePriceDTO from '@modules/users/dtos/ICreateSaleTablePriceDTO';

export default interface ISalesTablesPricesRepository {
  findAll(): Promise<SaleTablePrice[]>;
  findById(id: number): Promise<SaleTablePrice | undefined>;
  create(data: ICreateSaleTablePriceDTO): Promise<SaleTablePrice>;
  save(role: SaleTablePrice): Promise<SaleTablePrice>;
  delete(id: number): Promise<void>;
}
