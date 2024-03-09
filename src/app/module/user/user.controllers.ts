import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudyService } from '../study/study.service';
import { UserService } from './user.service';

const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['User']
  #swagger.summary = 'Get User Profile'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */

  const profile = await UserService.getUserProfile(req?.user?.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Profile Retrieve Successfully!',
    data: profile,
  });
});

const GenerateStudyPlan = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['User']
  #swagger.summary = 'Get User Study Plan'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const { startDate, endDate } = req.query;
  const plan = await StudyService.generateStudyPlan(
    req?.user?.id,
    startDate as string,
    endDate as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Study Plan Generate Successfully!',
    data: plan,
  });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['User']
  #swagger.summary = 'Update User'
  #swagger.security = [{
            "BearerAuth": []
    }]
  */
  const { name } = req.body;
  const profile = await UserService.updateUser(req?.user?.id, {
    name,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Profile Update By Id Successfully!',
    data: profile,
  });
});

export const UserControllers = {
  GetUserProfile,
  GenerateStudyPlan,
  UpdateUser,
};
