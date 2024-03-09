import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import ValidateRequest from '../../middlewares/validateRequest';
import { StudyValidation } from '../study/study.validation';
import { UserControllers } from './user.controllers';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/profile', IsAuthorized, UserControllers.GetUserProfile);
router.get(
  '/study-plan',
  IsAuthorized,
  ValidateRequest(StudyValidation.GenerateStudyPlan),
  UserControllers.GenerateStudyPlan
);

router.put(
  '/',
  IsAuthorized,
  ValidateRequest(UserValidation.UpdateUser),
  UserControllers.UpdateUser
);

export const UserRoutes = router;
