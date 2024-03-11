import express from 'express';
import IsAuthorized from '../../middlewares/isAuthorized';
import ValidateRequest from '../../middlewares/validateRequest';
import { ScheduleControllers } from './schedule.controllers';
import { ScheduleValidation } from './schedule.validation';

const router = express.Router();

router.get('/', IsAuthorized, ScheduleControllers.GetAllSchedules);
router.get('/:id', IsAuthorized, ScheduleControllers.GetScheduleById);
router.post(
  '/',
  IsAuthorized,
  ValidateRequest(ScheduleValidation.CreateScheduleSchema),
  ScheduleControllers.CreateSchedule
);
router.put(
  '/:id',
  IsAuthorized,
  ValidateRequest(ScheduleValidation.UpdateScheduleSchema),
  ScheduleControllers.UpdateScheduleById
);
router.delete('/:id', IsAuthorized, ScheduleControllers.DeleteScheduleById);

export const ScheduleRoutes = router;
