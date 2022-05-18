import { Router } from 'express';
import clientsRouter from './clients.routes';
import orderProductsRouter from './orderProducts.routes';
import ordersRouter from './orders.routes';
import providersRouter from './providers.routes';
import downloadsRouter from './downloads.routes';

const commercialRouter = Router();

commercialRouter.use('/clients', clientsRouter);
commercialRouter.use('/orderProducts', orderProductsRouter);
commercialRouter.use('/orders', ordersRouter);
commercialRouter.use('/providers', providersRouter);
commercialRouter.use('/downloads', downloadsRouter);

export default commercialRouter;
