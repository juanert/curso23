import { Express, Request, Response } from 'express';
import authRouter from './auth.routes';
import dashboardRouter from './dashboard.routes';
import patientRouter from './patient.routes';
import appointmentRouter from './appointment.routes';
import medicalRecordRouter from './medicalRecord.routes';
import prescriptionRouter from './prescription.routes';

export function registerRoutes(app: Express) {
  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'emr-backend' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/patients', patientRouter);
  app.use('/api/appointments', appointmentRouter);
  app.use('/api', medicalRecordRouter);
  app.use('/api', prescriptionRouter);

  // TODO: mount feature routers (patients, records, appointments, etc.)
}
