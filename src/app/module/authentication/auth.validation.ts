import { z } from 'zod';

const sentOtp = z.object({
  body: z.object({
    mobileNumber: z
      .string({ required_error: 'Mobile Number is required' })
      .min(11, 'Please, Enter a valid Mobile Number'),
  }),
});
const VerifyOtp = z.object({
  body: z.object({
    mobileNumber: z
      .string({ required_error: 'Mobile Number is required' })
      .min(11, 'Please, Enter a valid Mobile Number'),
    otpCode: z.string().min(4, 'Otp Code is required'),
  }),
});

export const AuthValidation = {
  sentOtp,
  VerifyOtp,
};
