import { addMinutes, isAfter } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { prismaClient } from '../../../Database';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JWT } from '../../../helpers/jwtHelpers';
import { VerifyOtpType } from './auth.interface';

const sentOtp = async (payload: string): Promise<string> => {
  const otpCode = await otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expiresIn = addMinutes(new Date(), 5);
  await prismaClient.otp.deleteMany({
    where: {
      mobileNumber: payload,
    },
  });
  await prismaClient.otp.create({
    data: {
      mobileNumber: payload,
      otpCode,
      expiresIn,
    },
  });
  const userNumbers = payload;
  const searchParams = new URLSearchParams({
    contacts: userNumbers,
    msg: `EduFixUp Login Code:${otpCode}. This OTP will be expired within 5 Minutes`,
  });
  if (config.env !== 'development') {
    await fetch(`${config.SMS_BASE_URL}+${searchParams.toString()}`, {
      method: 'GET',
    });
  }
  return otpCode;
};
const verifyOtp = async (
  payload: VerifyOtpType
): Promise<{ token: string; isNewUser: boolean; role: string }> => {
  const findOtp = await prismaClient.otp.findFirst({
    where: {
      mobileNumber: payload.mobileNumber,
    },
  });
  if (findOtp?.otpCode !== payload.otpCode) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Wrong Otp');
  }
  const isExpired = isAfter(new Date(), new Date(findOtp.expiresIn as Date));
  if (isExpired) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Otp Expired');
  }
  await prismaClient.otp.deleteMany({
    where: {
      mobileNumber: payload.mobileNumber,
    },
  });
  const user = await prismaClient.user.findFirst({
    where: {
      mobileNumber: payload.mobileNumber,
    },
  });
  if (user) {
    return {
      token: await JWT.createToken(
        { id: user.id },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      ),
      isNewUser: false,
      role: user.type as string,
    };
  }
  const createUser = await prismaClient.user.create({
    data: {
      mobileNumber: payload.mobileNumber,
    },
  });
  await prismaClient.student.create({
    data: { userId: createUser.id },
  });

  return {
    token: await JWT.createToken(
      { id: createUser.id },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    ),
    isNewUser: true,
    role: createUser.type as string,
  };
};

export const AuthService = {
  sentOtp,
  verifyOtp,
};
