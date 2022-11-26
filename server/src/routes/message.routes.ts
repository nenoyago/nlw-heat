import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateMessageController } from '../controllers/CreateMessageController';
import { GetLast3MessagesController } from '../controllers/GetLast3MessagesController';

const messageRoutes = Router();

messageRoutes.post(
  '/',
  ensureAuthenticated,
  new CreateMessageController().handle
);
messageRoutes.get('/last3', new GetLast3MessagesController().handle);

export { messageRoutes };
