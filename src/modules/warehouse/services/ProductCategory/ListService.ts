import { inject, injectable } from 'tsyringe';

import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  page: number;
  keyword: string;
  perPage: number;
  orderByField: string;
  orderBySort: string;
}

interface IHeader {
  name: string;
  field: string;
  sortable: boolean;
}

interface IResponse {
  items: ProductCategory[];
  headers: IHeader[];
  itensPerPage: number;
  totalItens: number;
  page: number;
}

@injectable()
class ListService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    keyword,
    perPage,
    orderByField,
    orderBySort,
  }: IRequest): Promise<IResponse> {
    const {
      productCategories,
      count,
    } = await this.productCategoriesRepository.findAllWithPaginationAndSearch({
      page,
      keyword,
      perPage,
      orderByField,
      orderBySort,
    });

    const headers = [
      { name: 'Cód.', field: 'id', sortable: true },
      { name: 'Nome', field: 'name', sortable: true },
      { name: 'Ações', field: 'actions', sortable: false },
    ];

    return {
      items: productCategories,
      headers,
      itensPerPage: perPage,
      totalItens: count,
      page,
    };
  }
}

export default ListService;
