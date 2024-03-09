import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controllers';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/sent-otp',
  ValidateRequest(AuthValidation.sentOtp),
  AuthControllers.SentOtp
);
router.post(
  '/verify-otp',
  ValidateRequest(AuthValidation.VerifyOtp),
  AuthControllers.VerifyOtp
);

export const AuthRoutes = router;
