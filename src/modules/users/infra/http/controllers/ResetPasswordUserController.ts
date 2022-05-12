import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUserService from '@modules/users/services/ResetPasswordUserService';

export default class ResetPasswordUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;
    const resetPasswordUserService = container.resolve(
      ResetPasswordUserService,
    );

    await resetPasswordUserService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
