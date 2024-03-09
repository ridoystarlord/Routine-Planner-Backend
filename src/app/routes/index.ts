import express from 'express';
import { AuthRoutes } from '../module/authentication/auth.routes';

const router = express.Router();

router.use('/auth', AuthRoutes);

export default router;
