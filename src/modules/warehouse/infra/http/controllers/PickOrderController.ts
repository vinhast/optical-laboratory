import { Request, Response } from 'express';
import { container } from 'tsyringe';
import path from 'path';

import PdfService from '@modules/warehouse/services/pickOrder/PdfService';

export default class PickOrderController {
  public async pdf(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const pdfService = container.resolve(PdfService);
    const result = await pdfService.execute({
      id: Number(id),
      userId: request.user.id,
    });
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      result,
    );

    setTimeout(() => {
      response.sendFile(filePath);
    }, 500);
  }
}
