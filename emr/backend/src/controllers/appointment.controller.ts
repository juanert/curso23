import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { appointmentService } from '../services/appointment.service';

export const createAppointment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const appointment = await appointmentService.createAppointment(req.user.id, req.body);
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

export const listAppointments = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const { status, from, to } = req.query;
    const items = await appointmentService.listAppointments(req.user.id, {
      status: status as any,
      from: (from as string) || undefined,
      to: (to as string) || undefined,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getAppointment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const appointment = await appointmentService.getAppointmentById(req.user.id, req.params.id);
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const appointment = await appointmentService.updateAppointment(req.user.id, req.params.id, req.body);
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    await appointmentService.deleteAppointment(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
