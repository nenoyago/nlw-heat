import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { githubRoutes } from './github.routes';
import { messageRoutes } from './message.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use(githubRoutes);
routes.use('/authenticate', authenticateRoutes);
routes.use('/messages', messageRoutes);
routes.use('/user', userRoutes);

export { routes };
