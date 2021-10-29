import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DataTableService from '@shared/services/DataTable/DataTableService';

export default class DataTableController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(DataTableService);
    const {
      source,
      entity,
      page,
      keyword,
      perPage,
      orderBySort,
      orderBy,
      searchParameters,
      onlyParent,
      parentId,
      entityId,
    } = request.query;

    const items = await listItems.execute({
      entity: String(entity),
      source: String(source),
      page: Number(page),
      keyword: String(keyword),
      perPage: Number(perPage),
      orderByField: orderBy,
      orderBySort: orderBySort === 'DESC' ? 'DESC' : 'ASC',
      searchParameters,
      onlyParent: !!onlyParent,
      parentId: String(parentId),
      entityId: String(entityId),
    });

    return response.json(classToClass(items));
  }
}
