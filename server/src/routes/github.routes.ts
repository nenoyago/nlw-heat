import { Router, Request, Response } from 'express';

const githubRoutes = Router();

githubRoutes.get('/github', (_: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});
githubRoutes.get(
  '/sign-in/callback',
  (request: Request, response: Response) => {
    const { code } = request.query;

    return response.json(code);
  }
);

export { githubRoutes };
