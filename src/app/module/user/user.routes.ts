import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.get('/profile', IsAuthorized, UserControllers.GetUserProfile);

export const UserRoutes = router;
