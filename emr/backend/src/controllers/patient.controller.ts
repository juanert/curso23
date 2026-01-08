import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { patientService } from '../services/patient.service';

export const createPatient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    const patient = await patientService.createPatient(req.user.id, req.body);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

export const listPatients = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    const { search, page, pageSize } = req.query;
    const result = await patientService.listPatients(req.user.id, {
      search: (search as string) || undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getPatient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    const patient = await patientService.getPatientById(req.user.id, req.params.id);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    const patient = await patientService.updatePatient(req.user.id, req.params.id, req.body);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    await patientService.softDeletePatient(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
