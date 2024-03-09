import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import ValidateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import { StudyValidation } from './user.validation';

const router = express.Router();

router.get('/profile', IsAuthorized, UserControllers.GetUserProfile);
router.get(
  '/study-plan',
  IsAuthorized,
  ValidateRequest(StudyValidation.GenerateStudyPlan),
  UserControllers.GenerateStudyPlan
);

export const UserRoutes = router;
