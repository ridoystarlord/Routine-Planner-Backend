import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import ValidateRequest from '../../middlewares/validateRequest';
import { StudyControllers } from './study.controllers';
import { StudyValidation } from './study.validation';

const router = express.Router();

router.get('/topic', IsAuthorized, StudyControllers.GetAllTopics);
router.get('/topic/:id', IsAuthorized, StudyControllers.GetTopicById);
router.post(
  '/topic',
  IsAuthorized,
  ValidateRequest(StudyValidation.CreateStudyTopic),
  StudyControllers.CreateTopic
);
router.put(
  '/topic/:id',
  IsAuthorized,
  ValidateRequest(StudyValidation.UpdateStudyTopic),
  StudyControllers.UpdateTopicById
);
router.delete('/topic/:id', IsAuthorized, StudyControllers.DeleteTopicById);

export const StudyRoutes = router;
