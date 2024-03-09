import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { StudyControllers } from './study.controllers';

const router = express.Router();

router.post('/topic', IsAuthorized, StudyControllers.createTopic);

export const StudyRoutes = router;
