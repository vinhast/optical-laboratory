import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordClientApplicationUserService from '@modules/users/services/ResetPasswordClientApplicationUserService';

export default class ResetPasswordClientApplicationUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;
    const resetPasswordClientApplicationUserService = container.resolve(
      ResetPasswordClientApplicationUserService,
    );

    await resetPasswordClientApplicationUserService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
