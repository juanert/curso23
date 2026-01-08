import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { UserModel } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : undefined;

    const token = bearerToken || (req.cookies && (req.cookies.accessToken as string));

    if (!token) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }

    const payload = verifyAccessToken(token);
    const user = await UserModel.findById(payload.sub).select('_id role');
    if (!user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'User not found' });
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Invalid or expired token' });
  }
}
