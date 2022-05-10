import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FiscalSetting/ListService';
import CreateService from '@modules/financial/services/FiscalSetting/CreateService';
import UpdateService from '@modules/financial/services/FiscalSetting/UpdateService';
import GetService from '@modules/financial/services/FiscalSetting/GetService';
import DeleteService from '@modules/financial/services/FiscalSetting/DeleteService';

export default class FiscalSettingsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFiscalSettings = container.resolve(ListService);
    const fiscalSettings = await listFiscalSettings.execute();

    return response.json(classToClass(fiscalSettings));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fiscalSetting } = request.body;
    const createFiscalSetting = container.resolve(CreateService);
    const fiscalSettingCreate = await createFiscalSetting.execute(
      fiscalSetting,
    );

    return response.json(classToClass(fiscalSettingCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFiscalSetting = container.resolve(GetService);
    const fiscalSetting = await getFiscalSetting.execute(Number(id));

    return response.json(classToClass(fiscalSetting));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fiscalSetting } = request.body;
    const updateFiscalSetting = container.resolve(UpdateService);
    const fiscalSettingUpdate = await updateFiscalSetting.execute({
      id,
      ...fiscalSetting,
    });

    return response.json(classToClass(fiscalSettingUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFiscalSetting = container.resolve(DeleteService);
    await deleteFiscalSetting.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'fiscalSetting removed' });
  }
}
