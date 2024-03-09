import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { prismaClient } from '../../../Database';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JWT } from '../../../helpers/jwtHelpers';
import { UserService } from '../user/user.service';
import { ILogin, IRegister } from './auth.interface';

export class AuthService {
  public static async createUser(payload: IRegister) {
    const { name, email, password } = payload;
    const isUserExist = await UserService.getUserFromEmail(email);
    if (isUserExist) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Email Already Exists. Use another one'
      );
    }
    const salt = randomBytes(32).toString('hex');
    const hashPassword = UserService.getHashFromPassword(salt, password);
    return prismaClient.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        salt,
      },
    });
  }
  public static async getUserToken(payload: ILogin) {
    const { email, password } = payload;
    const user = await UserService.getUserFromEmail(email);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }
    const salt = user.salt;
    const hashPassword = UserService.getHashFromPassword(salt, password);
    if (hashPassword !== user.password) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Wrong Credentials');
    }
    return JWT.createToken(
      { id: user.id },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  }
}
