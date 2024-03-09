import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ScheduleService } from './schedule.service';

const CreateSchedule = catchAsync(async (req: Request, res: Response) => {
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
const GetAllSchedules = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Schedules']
  #swagger.summary = 'Get a user all schedules'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const schedules = await ScheduleService.getAllSchedules(req?.user?.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Schedule Retrieved Successfully!',
    data: schedules,
  });
});

export const ScheduleControllers = {
  CreateSchedule,
  GetAllSchedules,
};
