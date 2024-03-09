import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { prismaClient } from '../../Database';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { JWT } from '../../helpers/jwtHelpers';

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
      const findUser = await prismaClient.user.findUnique({
        where: { id: verifiedUser.id },
        include: {
          Instructor: true,
        },
      });
      req.user = findUser;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default IsAuthorized;
