import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createRecord, listRecordsForPatient, getRecord, updateRecord } from '../controllers/medicalRecord.controller';
import { validate } from '../middlewares/validation.middleware';
import { createMedicalRecordSchema } from '../validations/medicalRecord.validation';

const router = Router();

router.use(authMiddleware);

// Per-patient timeline
router.get('/patients/:patientId/records', listRecordsForPatient);
router.post('/patients/:patientId/records', validate(createMedicalRecordSchema), createRecord);

// Direct record access
router.get('/records/:id', getRecord);
router.put('/records/:id', updateRecord);

export default router;
