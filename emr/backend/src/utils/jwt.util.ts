import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string;
  role: string;
}

const ACCESS_TOKEN_EXPIRES_IN = '15m';

export function signAccessToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET || 'changeme';
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET || 'changeme';
  return jwt.verify(token, secret) as JwtPayload;
}
