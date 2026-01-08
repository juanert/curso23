import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createPatient, listPatients, getPatient, updatePatient, deletePatient } from '../controllers/patient.controller';
import { validate } from '../middlewares/validation.middleware';
import { createPatientSchema, updatePatientSchema } from '../validations/patient.validation';

const router = Router();

router.use(authMiddleware);

router.get('/', listPatients);
router.post('/', validate(createPatientSchema), createPatient);
router.get('/:id', getPatient);
router.put('/:id', validate(updatePatientSchema), updatePatient);
router.delete('/:id', deletePatient);

export default router;
