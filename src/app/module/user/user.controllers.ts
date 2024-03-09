import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const UserControllers = {
  GetUserProfile,
};
