import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.get('/profile', IsAuthorized, UserControllers.GetUserProfile);
router.get('/study-plan', IsAuthorized, UserControllers.GenerateStudyPlan);

export const UserRoutes = router;
