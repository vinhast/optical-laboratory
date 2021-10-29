import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/cache/services/ListService';
import DeleteService from '@modules/cache/services/DeleteService';

export default class CacheController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCampaings = container.resolve(ListService);
    const campaings = await listCampaings.execute();

    return response.json(classToClass(campaings));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { key } = request.params;
    const deleteCampaing = container.resolve(DeleteService);
    await deleteCampaing.execute(key);

    return response.status(204).json({ message: 'Cache key removed' });
  }
}
