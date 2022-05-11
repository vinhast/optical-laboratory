import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import financialRouter from '@modules/financial/infra/http/routes/financial.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import menusRouter from '@modules/users/infra/http/routes/menus.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import checkPermission from '@modules/users/infra/http/routes/checkPermission.route';
import cacheRouter from '@modules/cache/infra/http/routes/cache.route';
import clientsRouter from '@modules/commercial/infra/http/routes/clients.routes';
import orderProductsRouter from '@modules/commercial/infra/http/routes/orderProducts.routes';
import ordersRouter from '@modules/commercial/infra/http/routes/orders.routes';
import providersRouter from '@modules/commercial/infra/http/routes/providers.routes';
import productsRouter from '@modules/warehouse/infra/http/routes/products.routes';
import productCategoriesRouter from '@modules/warehouse/infra/http/routes/productCategories.routes';
import stockMovimentsRouter from '@modules/warehouse/infra/http/routes/stockMoviments.routes';
import unitTypesRouter from '@modules/warehouse/infra/http/routes/unitTypes.routes';

import dataTableRouter from './dataTable.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/checkPermission', checkPermission);
routes.use('/cache', cacheRouter);

routes.use(ensureAuthenticated);
routes.use('/users', usersRouter);
routes.use('/financial', financialRouter);
routes.use('/dataTable', dataTableRouter);
routes.use('/menus', menusRouter);

routes.use('/clients', clientsRouter);
routes.use('/orderProducts', orderProductsRouter);
routes.use('/orders', ordersRouter);
routes.use('/providers', providersRouter);
routes.use('/products', productsRouter);
routes.use('/productCategories', productCategoriesRouter);
routes.use('/stockMoviments', stockMovimentsRouter);
routes.use('/unitTypes', unitTypesRouter);

export default routes;
