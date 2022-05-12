import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordUserService from '@modules/users/services/SendForgotPasswordUserService';

export default class ForgotPasswordUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    const sendForgotPasswordUserService = container.resolve(
      SendForgotPasswordUserService,
    );

    await sendForgotPasswordUserService.execute({
      username,
    });

    return response.status(204).json();
  }
}
