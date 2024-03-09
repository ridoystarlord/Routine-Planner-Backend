import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import ValidateRequest from '../../middlewares/validateRequest';
import { ScheduleControllers } from './schedule.controllers';
import { ScheduleValidation } from './schedule.validation';

const router = express.Router();

router.get('/', IsAuthorized, ScheduleControllers.GetAllSchedules);
router.post(
  '/',
  IsAuthorized,
  ValidateRequest(ScheduleValidation.CrateScheduleSchema),
  ScheduleControllers.CreateSchedule
);

export const ScheduleRoutes = router;
