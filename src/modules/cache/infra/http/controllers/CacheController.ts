import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/cache/services/ListService';
import DeleteService from '@modules/cache/services/DeleteService';

export default class CacheController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCache = container.resolve(ListService);
    const cache = await listCache.execute();

    return response.json(classToClass(cache));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { key } = request.params;
    const deleteCache = container.resolve(DeleteService);
    await deleteCache.execute(key);

    return response.status(204).json({ message: 'Cache key removed' });
  }
}
