import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import permissionsRouter from '@modules/users/infra/http/routes/permissions.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import menusRouter from '@modules/users/infra/http/routes/menus.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import checkPermission from '@modules/users/infra/http/routes/checkPermission.route';
import cacheRouter from '@modules/cache/infra/http/routes/cache.route';
import clientsRouter from '@modules/commercial/infra/http/routes/clients.routes';
import orderProductsRouter from '@modules/commercial/infra/http/routes/orderProducts.routes';
import ordersRouter from '@modules/commercial/infra/http/routes/orders.routes';
import providersRouter from '@modules/commercial/infra/http/routes/providers.routes';
import dataTableRouter from './dataTable.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/users', usersRouter);

routes.use('/checkPermission', checkPermission);
routes.use('/cache', cacheRouter);

routes.use(ensureAuthenticated);
routes.use('/dataTable', dataTableRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/roles', rolesRouter);
routes.use('/menus', menusRouter);
routes.use('/profile', profileRouter);

routes.use('/clients', clientsRouter);
routes.use('/orderProducts', orderProductsRouter);
routes.use('/orders', ordersRouter);
routes.use('/providers', providersRouter);

export default routes;
