import { sign, verify } from 'jsonwebtoken';

import auth from '../config/auth';
import { IJwtPayload } from '../interfaces/IJWTPayload';

const { secret_token, expires_in_token } = auth;

export function generateToken(user_id: string, payload: Object = {}): string {
  const token = sign(payload, secret_token, {
    subject: user_id,
    expiresIn: expires_in_token,
  });

  return token;
}

export function verifyToken(token: string): IJwtPayload {
  const decode = verify(token, secret_token) as IJwtPayload;

  return decode;
}
