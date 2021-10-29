import { Router } from 'express';

import DataTableController from '@shared/infra/http/controllers/DataTableController';

const dataTableRouter = Router();
const dataTableController = new DataTableController();

dataTableRouter.get('/', dataTableController.list);

export default dataTableRouter;
