import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;
    const { id } = request.user;

    const service = new CreateMessageService();

    const result = await service.execute(message, id);

    return response.json(result);
  }
}

export { CreateMessageController };
