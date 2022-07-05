import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordClientApplicationUserService from '@modules/users/services/SendForgotPasswordClientApplicationUserService';

export default class ForgotPasswordClientApplicationUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordClientApplicationUserService = container.resolve(
      SendForgotPasswordClientApplicationUserService,
    );

    await sendForgotPasswordClientApplicationUserService.execute({
      email,
    });

    return response.status(204).json();
  }
}
