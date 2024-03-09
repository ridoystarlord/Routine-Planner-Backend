import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { ScheduleControllers } from './schedule.controllers';

const router = express.Router();

router.post('/', IsAuthorized, ScheduleControllers.createSchedule);

export const ScheduleRoutes = router;
