import { z } from 'zod';

const UpdateUser = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
  }),
});

export const UserValidation = { UpdateUser };
