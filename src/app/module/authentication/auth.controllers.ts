import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const SentOtp = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Sent Otp'
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type:"object",
                    properties:{
                      mobileNumber:{
                        type:"string"
                      }
                    }
                },
                example:{
                  mobileNumber:"01712345678",
                }  
            }
        }
    } 
  */
  const { mobileNumber } = req.body;

  if (mobileNumber === '') {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Mobile Number is Required',
      data: null,
    });
  }
  if (
    mobileNumber.length < 11 ||
    mobileNumber.length > 11 ||
    mobileNumber.includes('+') ||
    mobileNumber.includes('+8') ||
    mobileNumber.includes('+88') ||
    !mobileNumber.startsWith('01')
  ) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Please Enter valid Mobile Number',
      data: null,
    });
  }

  const otp = await AuthService.sentOtp(mobileNumber);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Otp Sent Successfully!',
    data:
      config.env === 'development'
        ? {
            otp,
          }
        : null,
  });
});

const VerifyOtp = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Verify Otp and Get  Access Token'
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type:"object",
                    properties:{
                      mobileNumber:{
                        type:"string"
                      },
                      otpCode:{
                        type:"string"
                      }
                    }
                }, 
                example:{
                  mobileNumber:"01712345678",
                  otpCode:"1234"
                } 
            }
        }
    } 
  */
  const { mobileNumber, otpCode } = req.body;

  const token = await AuthService.verifyOtp({ mobileNumber, otpCode });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Otp Verified Successfully!',
    data: token,
  });
});

export const AuthControllers = {
  SentOtp,
  VerifyOtp,
};
