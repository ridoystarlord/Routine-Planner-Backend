import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { StudyControllers } from './study.controllers';

const router = express.Router();

router.get('/topic', IsAuthorized, StudyControllers.GetAllTopics);
router.post('/topic', IsAuthorized, StudyControllers.CreateTopic);

export const StudyRoutes = router;
