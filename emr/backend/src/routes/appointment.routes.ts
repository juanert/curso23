import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createAppointment, listAppointments, getAppointment, updateAppointment, deleteAppointment } from '../controllers/appointment.controller';
import { validate } from '../middlewares/validation.middleware';
import { createAppointmentSchema } from '../validations/appointment.validation';

const router = Router();

router.use(authMiddleware);

router.get('/', listAppointments);
router.post('/', validate(createAppointmentSchema), createAppointment);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
