import { container } from 'tsyringe';

import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ProductCategoriesRepository from '@modules/warehouse/infra/typeorm/repositories/ProductCategoriesRepository';

// import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
// import ProductAttributesRepository from '@modules/warehouse/infra/typeorm/repositories/ProductAttributesRepository';

// import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
// import ProductUnitMeasuredRepository from '@modules/warehouse/infra/typeorm/repositories/ProductUnitMeasuredRepository';

import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ProductsRepository from '@modules/warehouse/infra/typeorm/repositories/ProductsRepository';

// import IProdutosRepository from '@modules/warehouse/repositories/IProdutosRepository';
// import ProdutosRepository from '@modules/warehouse/infra/typeorm/repositories/ProdutosRepository';

// import IStocksRepository from '@modules/warehouse/repositories/IStocksRepository';
// import StocksRepository from '@modules/warehouse/infra/typeorm/repositories/StocksRepository';

import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import StockMovimentsRepository from '@modules/warehouse/infra/typeorm/repositories/StockMovimentsRepository';

// import IWarehousesRepository from '@modules/warehouse/repositories/IWarehouseRepository';
// import WarehousesRepository from '@modules/warehouse/infra/typeorm/repositories/WarehouseRepository';

// import IPickOrderRepository from '@modules/warehouse/repositories/IPickOrderRepository';
// import PickOrderRepository from '@modules/warehouse/infra/typeorm/repositories/PickOrderRepository';

container.registerSingleton<IProductCategoriesRepository>(
  'ProductCategoriesRepository',
  ProductCategoriesRepository,
);

// container.registerSingleton<IProductAttributesRepository>(
//   'ProductAttributesRepository',
//   ProductAttributesRepository,
// );

// container.registerSingleton<IProductUnitMeasuredRepository>(
//   'ProductUnitMeasuredRepository',
//   ProductUnitMeasuredRepository,
// );

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

// container.registerSingleton<IProdutosRepository>(
//   'ProdutosRepository',
//   ProdutosRepository,
// );

// container.registerSingleton<IStocksRepository>(
//   'StocksRepository',
//   StocksRepository,
// );

container.registerSingleton<IStockMovimentsRepository>(
  'StockMovimentsRepository',
  StockMovimentsRepository,
);

// container.registerSingleton<IWarehousesRepository>(
//   'WarehousesRepository',
//   WarehousesRepository,
// );

// container.registerSingleton<IPickOrderRepository>(
//   'PickOrderRepository',
//   PickOrderRepository,
// );
