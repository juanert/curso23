import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export function authorize(roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ code: 'FORBIDDEN', message: 'Forbidden' });
    }

    next();
  };
}
