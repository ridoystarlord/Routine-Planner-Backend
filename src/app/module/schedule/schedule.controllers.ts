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

const GetScheduleById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Schedules']
  #swagger.summary = 'Get Schedule By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  const schedule = await ScheduleService.getScheduleById(req?.user?.id, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get Schedule By Id Successfully!',
    data: schedule,
  });
});

const UpdateScheduleById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Schedules']
  #swagger.summary = 'Update Schedule By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  const { date, classes, jobs, studySlots } = req.body;
  await ScheduleService.updateScheduleById(req?.user?.id, id, {
    date,
    classes,
    jobs,
    studySlots,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Schedule Updated By Id Successfully!',
  });
});

const DeleteScheduleById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Schedules']
  #swagger.summary = 'Delete Schedule By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  await ScheduleService.deleteScheduleById(req?.user?.id, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Schedule Deleted By Id Successfully!',
  });
});

export const ScheduleControllers = {
  CreateSchedule,
  GetAllSchedules,
  GetScheduleById,
  UpdateScheduleById,
  DeleteScheduleById,
};
