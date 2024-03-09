import { z } from 'zod';

const Register = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Minimum Password length should be 6'),
  }),
});
const Login = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Minimum Password length should be 6'),
  }),
});

export const AuthValidation = {
  Register,
  Login,
};
