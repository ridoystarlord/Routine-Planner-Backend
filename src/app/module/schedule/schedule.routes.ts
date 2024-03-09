import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import { ScheduleControllers } from './schedule.controllers';

const router = express.Router();

router.get('/', IsAuthorized, ScheduleControllers.GetAllSchedules);
router.post('/', IsAuthorized, ScheduleControllers.CreateSchedule);

export const ScheduleRoutes = router;
