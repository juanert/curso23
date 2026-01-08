import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { authService } from '../services/auth.service';
import { PatientModel } from '../models/patient.model';
import { appointmentService } from '../services/appointment.service';

export const getOverview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }

    const user = await authService.getCurrentUser(req.user.id);

    const [totalPatients, upcomingAppointments] = await Promise.all([
      PatientModel.countDocuments({ primaryDoctor: req.user.id, isActive: true }),
      appointmentService.countUpcomingForDoctor(req.user.id, new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    ]);

    const stats = {
      totalPatients,
      upcomingAppointments,
    };

    res.json({
      doctor: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      stats,
      serverTime: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
};
