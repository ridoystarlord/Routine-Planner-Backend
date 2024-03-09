import express from 'express';
import { AuthRoutes } from '../module/authentication/auth.routes';
import { ScheduleRoutes } from '../module/schedule/schedule.routes';
import { UserRoutes } from '../module/user/user.routes';

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/schedule', ScheduleRoutes);
router.use('/user', UserRoutes);

export default router;
