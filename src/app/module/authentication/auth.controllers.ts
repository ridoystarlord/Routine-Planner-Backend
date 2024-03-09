import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILogin, IRegister } from './auth.interface';
import { AuthService } from './auth.service';

const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Register User'
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type:"object",
                    properties:{
                      name:{
                        type:"string"
                      },
                      email:{
                        type:"string"
                      },
                      password:{
                        type:"string"
                      }
                    }
                },
                example:{
                  name:"John Doe",
                  email:"example@gmail.com",
                  password:"123456",
                }  
            }
        }
    } 
  */
  const { name, email, password }: IRegister = req.body;

  await AuthService.createUser({ name, email, password });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Register Successfully!',
  });
});

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Login User'
  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type:"object",
                    properties:{
                      email:{
                        type:"string"
                      },
                      password:{
                        type:"string"
                      }
                    }
                },
                example:{
                  email:"example@gmail.com",
                  password:"123456",
                }  
            }
        }
    } 
  */
  const { email, password }: ILogin = req.body;

  const token = await AuthService.getUserToken({ email, password });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login Successfully!',
    data: { token },
  });
});

export const AuthControllers = {
  RegisterUser,
  LoginUser,
};
