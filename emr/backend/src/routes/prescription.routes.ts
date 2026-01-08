import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createPrescription, listPrescriptionsForRecord, getPrescriptionPdf } from '../controllers/prescription.controller';

const router = Router();

router.use(authMiddleware);

router.get('/records/:recordId/prescriptions', listPrescriptionsForRecord);
router.post('/records/:recordId/prescriptions', createPrescription);
router.get('/prescriptions/:prescriptionId/pdf', getPrescriptionPdf);

export default router;
