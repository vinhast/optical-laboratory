import { Router } from 'express';
import productCategoriesRouter from './productCategories.routes';
import productsRouter from './products.routes';
import servicesRouter from './services.routes';
import stockMovimentsRouter from './stockMoviments.routes';
import unitTypesRouter from './unitTypes.routes';

const warehouseRouter = Router();

warehouseRouter.use('/products', productsRouter);
warehouseRouter.use('/services', servicesRouter);
warehouseRouter.use('/productCategories', productCategoriesRouter);
warehouseRouter.use('/stockMoviments', stockMovimentsRouter);
warehouseRouter.use('/unitTypes', unitTypesRouter);

export default warehouseRouter;
