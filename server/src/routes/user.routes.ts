import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ProfileUserController } from '../controllers/ProfileUserController';

const userRoutes = Router();

userRoutes.get(
  '/profile',
  ensureAuthenticated,
  new ProfileUserController().handle
);

export { userRoutes };
