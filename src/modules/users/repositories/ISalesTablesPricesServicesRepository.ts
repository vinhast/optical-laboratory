import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import ICreateSaleTablePriceServiceDTO from '@modules/users/dtos/ICreateSaleTablePriceServiceDTO';

export default interface ISalesTablesPricesServicesRepository {
  findAll(): Promise<SaleTablePriceService[]>;
  findById(id: number): Promise<SaleTablePriceService | undefined>;
  create(data: ICreateSaleTablePriceServiceDTO): Promise<SaleTablePriceService>;
  save(role: SaleTablePriceService): Promise<SaleTablePriceService>;
  delete(id: number): Promise<void>;
}
