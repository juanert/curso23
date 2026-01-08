import { Router } from 'express';
import { getOverview } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/overview', authMiddleware, getOverview);

export default router;
