import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CheckPermissionService from '@modules/users/services/CheckPermissionService';
import { classToClass } from 'class-transformer';

export default class CheckPermissionController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { method, originalUrl, role_id, user_id } = request.body;
    const checkPermission = container.resolve(CheckPermissionService);
    const permission = await checkPermission.execute({
      method,
      originalUrl,
      role_id,
      user_id,
    });

    return response.json(classToClass(permission));
  }
}
