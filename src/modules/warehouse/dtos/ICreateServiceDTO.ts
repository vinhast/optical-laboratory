import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';

export default interface ICreateServiceDTO {
  name: string;
  description?: string;
  price?: string;
  tables?: SaleTablePriceService[];
}
