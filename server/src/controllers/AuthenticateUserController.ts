import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const service = new AuthenticateUserService();

    const result = await service.execute(code as string);

    return response.json(result);
  }
}

export { AuthenticateUserController };
