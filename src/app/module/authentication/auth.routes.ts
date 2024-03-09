import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controllers';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  ValidateRequest(AuthValidation.Register),
  AuthControllers.RegisterUser
);
router.post(
  '/login',
  ValidateRequest(AuthValidation.Login),
  AuthControllers.LoginUser
);

export const AuthRoutes = router;
