import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudyService } from './study.service';

const CreateTopic = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Add a Topic'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const { topic, priority, duration } = req.body;
  const studyTopic = await StudyService.addTopic(req?.user?.id, {
    topic,
    priority,
    duration,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Topic Added Successfully!',
    data: studyTopic,
  });
});

const GetAllTopics = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Get All Topics'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const topics = await StudyService.getAllTopics(req?.user?.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Topic Retrieved Successfully!',
    data: topics,
  });
});

const GetAllAvailableTime = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Get All Available Times'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const topics = await StudyService.getAllAvailableTime(req?.user?.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Available Time Retrieved Successfully!',
    data: topics,
  });
});

const GetTopicById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Get Topic By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  const topics = await StudyService.getTopicById(req?.user?.id, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get Topic By Id Successfully!',
    data: topics,
  });
});

const UpdateTopicById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Update Topic By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  const { topic, priority, duration, isComplete } = req.body;
  const topics = await StudyService.updateTopicById(req?.user?.id, id, {
    topic,
    priority,
    duration,
    isComplete,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Topic Update By Id Successfully!',
    data: topics,
  });
});

const DeleteTopicById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Delete Topic By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  await StudyService.deleteTopicById(req?.user?.id, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Topic Deleted By Id Successfully!',
  });
});

const DeleteAvailableTimeById = catchAsync(
  async (req: Request, res: Response) => {
    /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Delete Available Time Slot By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

    const { id } = req.params;
    await StudyService.deleteAvailableTimeById(req?.user?.id, id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Available Time Slot Deleted By Id Successfully!',
    });
  }
);

export const StudyControllers = {
  CreateTopic,
  GetAllTopics,
  GetTopicById,
  UpdateTopicById,
  DeleteTopicById,
  GetAllAvailableTime,
  DeleteAvailableTimeById,
};
