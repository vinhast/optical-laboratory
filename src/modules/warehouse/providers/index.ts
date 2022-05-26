import { container } from 'tsyringe';

import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ProductCategoriesRepository from '@modules/warehouse/infra/typeorm/repositories/ProductCategoriesRepository';

import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import UnitTypesRepository from '@modules/warehouse/infra/typeorm/repositories/UnitTypesRepository';

import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ProductsRepository from '@modules/warehouse/infra/typeorm/repositories/ProductsRepository';

import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ServicesRepository from '@modules/warehouse/infra/typeorm/repositories/ServicesRepository';

import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import StockMovimentsRepository from '@modules/warehouse/infra/typeorm/repositories/StockMovimentsRepository';

container.registerSingleton<IProductCategoriesRepository>(
  'ProductCategoriesRepository',
  ProductCategoriesRepository,
);

container.registerSingleton<IUnitTypesRepository>(
  'UnitTypesRepository',
  UnitTypesRepository,
);

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
container.registerSingleton<IStockMovimentsRepository>(
  'StockMovimentsRepository',
  StockMovimentsRepository,
);
