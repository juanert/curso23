import { z } from 'zod';

export const createAppointmentSchema = z.object({
  body: z.object({
    patientId: z.string().min(1),
    startsAt: z.string().min(1),
    endsAt: z.string().min(1),
    reason: z.string().optional(),
    notes: z.string().optional(),
  }),
});
