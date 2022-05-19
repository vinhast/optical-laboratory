import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/commercial/services/Download/CreateService';
import GetService from '@modules/commercial/services/Download/GetService';
import UpdateService from '@modules/commercial/services/Download/UpdateService';
import DeleteService from '@modules/commercial/services/Download/DeleteService';
import ListService from '@modules/commercial/services/Download/ListService';

export default class DownloadsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listDownloads = container.resolve(ListService);
    const downloads = await listDownloads.execute();

    return response.json(classToClass(downloads));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, title, dir, user_id } = request.body;
    const createDownload = container.resolve(CreateService);
    const download = await createDownload.execute({
      description,
      title,
      attachment: request.file?.filename,
      dir,
      user_id,
    });

    return response.json(classToClass(download));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getDownload = container.resolve(GetService);
    const download = await getDownload.execute(Number(id));

    return response.json(classToClass(download));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { active, description, title, dir, user_id, deleteFile } =
      request.body;
    const updateDownload = container.resolve(UpdateService);
    const download = await updateDownload.execute({
      id: Number(id),
      active: Number(active),
      description,
      title,
      attachment: request.file?.filename,
      dir,
      user_id,
      deleteFile: deleteFile === 'true',
    });

    return response.json(classToClass(download));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteDownload = container.resolve(DeleteService);
    await deleteDownload.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Download removed' });
  }
}
