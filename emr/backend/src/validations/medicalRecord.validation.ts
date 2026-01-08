import { z } from 'zod';

export const createMedicalRecordSchema = z.object({
  body: z.object({
    patientId: z.string().min(1),
    appointmentId: z.string().optional(),
    visitDate: z.string().optional(),
    subjective: z.string().min(1),
    objective: z.string().min(1),
    assessment: z.string().min(1),
    plan: z.string().min(1),
  }),
});
