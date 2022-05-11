import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAvatarService from '@shared/services/ClientApplication/UpdateAvatarService';

export default class AvatarUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarService);

    const clientApplication = await updateAvatar.excute({
      client_application_id: request.user.id,
      avatarFilename: request.file?.filename || '',
    });

    return response.json(classToClass(clientApplication));
  }
}
