import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProdutosController from '@modules/warehouse/infra/http/controllers/ProdutosController';

const produtosRouter = Router();
const produtosController = new ProdutosController();

produtosRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  produtosController.get,
);

export default produtosRouter;
