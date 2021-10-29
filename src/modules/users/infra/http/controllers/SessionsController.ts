import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, menus } = await authenticateUser.execute({
      username,
      password,
    });

    return response.json({
      user: classToClass(user),
      token,
      menus: classToClass(menus),
    });
  }
}
