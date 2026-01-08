import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const registerDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerDoctor(req.body);
    res.status(201).json({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);

    // Set httpOnly cookie for access token (simplified; in production use secure & sameSite)
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.json(result.user);
  } catch (err) {
    next(err);
  }
};

export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }

    const user = await authService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
