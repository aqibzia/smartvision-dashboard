import express from 'express';
import authRoutes from './auth';
import aiRoutes from './ai';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/user', userRoutes);

export default router;
