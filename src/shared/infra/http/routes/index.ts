import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import financialRouter from '@modules/financial/infra/http/routes/financial.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import menusRouter from '@modules/users/infra/http/routes/menus.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import checkPermission from '@modules/users/infra/http/routes/checkPermission.route';
import cacheRouter from '@modules/cache/infra/http/routes/cache.route';

import dataTableRouter from '@shared/infra/http/routes/dataTable.routes';
import clientApplicationsRouter from '@shared/infra/http/routes/clientApplications.routes';
import commercialRouter from '@modules/commercial/infra/http/routes/commercial.routes';
import warehouseRouter from '@modules/warehouse/infra/http/routes/warehouse.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/checkPermission', checkPermission);
routes.use('/cache', cacheRouter);

routes.use(ensureAuthenticated);
routes.use('/users', usersRouter);
routes.use('/financial', financialRouter);
routes.use('/commercial', commercialRouter);
routes.use('/warehouse', warehouseRouter);
routes.use('/dataTable', dataTableRouter);
routes.use('/menus', menusRouter);

routes.use('/clientsApplication', clientApplicationsRouter);

export default routes;
