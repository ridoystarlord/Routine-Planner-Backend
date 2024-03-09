import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ScheduleService } from './schedule.service';

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Schedules']
  #swagger.summary = 'Add a user single day schedule'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const { date, classes, jobs, studySlots } = req.body;
  await ScheduleService.addASingleDaySchedule(req?.user?.id, {
    date,
    classes,
    jobs,
    studySlots,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Schedule Added Successfully!',
  });
});

export const ScheduleControllers = {
  createSchedule,
};
