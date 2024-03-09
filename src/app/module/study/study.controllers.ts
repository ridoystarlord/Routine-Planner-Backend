import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudyService } from './study.service';

const createTopic = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Add a Topic'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const { topic, priority, duration } = req.body;
  await StudyService.addTopic(req?.user?.id, {
    topic,
    priority,
    duration,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Topic Added Successfully!',
  });
});

export const StudyControllers = {
  createTopic,
};
