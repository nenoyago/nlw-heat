import axios from 'axios';

import prismaClient from '../prisma';

import { IAccessTokenResponse } from '../interfaces/IAccessTokenResponse';
import { IUserResponse } from '../interfaces/IUserResponse';
import { generateToken } from '../utils/jwt';

class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = generateToken(user.id, {
      name: user.name,
      avatar_url: user.avatar_url,
      id: user.id,
    });

    return { token, user };
  }
}

export { AuthenticateUserService };
