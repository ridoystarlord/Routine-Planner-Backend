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

const UpdateTopicById = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Study']
  #swagger.summary = 'Update Topic By Id'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const { id } = req.params;
  const { topic, priority, duration } = req.body;
  const topics = await StudyService.updateTopicById(id, {
    topic,
    priority,
    duration,
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
  const topics = await StudyService.deleteTopicById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Topic Deleted By Id Successfully!',
    data: topics,
  });
});

export const StudyControllers = {
  CreateTopic,
  GetAllTopics,
  UpdateTopicById,
  DeleteTopicById,
};
