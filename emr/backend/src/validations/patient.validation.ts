import { z } from 'zod';

export const createPatientSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date'),
    gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const updatePatientSchema = z.object({
  body: createPatientSchema.shape.body.partial(),
});
