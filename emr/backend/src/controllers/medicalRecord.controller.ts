import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { medicalRecordService } from '../services/medicalRecord.service';

export const createRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const record = await medicalRecordService.createRecord(req.user.id, req.body);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const listRecordsForPatient = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const { from, to } = req.query;
    const records = await medicalRecordService.listRecordsForPatient(req.user.id, req.params.patientId, {
      from: (from as string) || undefined,
      to: (to as string) || undefined,
    });
    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const getRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const record = await medicalRecordService.getRecordById(req.user.id, req.params.id);
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const record = await medicalRecordService.updateRecord(req.user.id, req.params.id, req.body);
    res.json(record);
  } catch (err) {
    next(err);
  }
};
