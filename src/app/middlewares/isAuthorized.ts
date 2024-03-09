import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { JWT } from '../../helpers/jwtHelpers';
import { AuthService } from '../module/authentication/auth.service';

const IsAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    token = token.split('Bearer ')[1];
    const verifiedUser = JWT.verifyToken(token, config.jwt.secret as Secret);
    if (verifiedUser.id) {
      const findUser = await AuthService.getUserFromID(verifiedUser.id);
      req.user = findUser;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default IsAuthorized;
