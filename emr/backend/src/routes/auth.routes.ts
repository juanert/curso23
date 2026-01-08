import { Router } from 'express';
import { registerDoctor, login, me } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { registerDoctorSchema, loginSchema } from '../validations/auth.validation';

const router = Router();

router.post('/register-doctor', validate(registerDoctorSchema), registerDoctor);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, me);

export default router;
