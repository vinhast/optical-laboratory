import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get('/', clientsController.list);

clientsRouter.post('/', clientsController.create);

clientsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsController.get,
);

clientsRouter.patch('/update/:id', clientsController.update);

clientsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsController.delete,
);

export default clientsRouter;
