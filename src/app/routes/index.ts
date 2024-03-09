import express from 'express';
import { AuthRoutes } from '../module/authentication/auth.routes';
import { UserRoutes } from '../module/user/user.routes';

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

export default router;
