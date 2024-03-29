import { z } from 'zod';

const timeSlotSchema = z.object({
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: 'startTime must be in HH:MM format' }),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: 'endTime must be in HH:MM format' }),
});

const CreateScheduleSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in YYYY-MM-DD format',
    }),
    classes: z
      .array(timeSlotSchema)
      .max(2, { message: "Classes can't have more than 2 items" })
      .default([]), // Ensuring it can be an empty array
    jobs: z.array(timeSlotSchema).default([]), // Ensuring it can be an empty array
    studySlots: z.array(timeSlotSchema).default([]), // Ensuring it can be an empty array
  }),
});

const UpdateScheduleSchema = z.object({
  body: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in YYYY-MM-DD format',
      })
      .optional()
      .default(''),
    classes: z
      .array(timeSlotSchema)
      .max(2, { message: "Classes can't have more than 2 items" })
      .default([]), // Ensuring it can be an empty array
    jobs: z.array(timeSlotSchema).default([]), // Ensuring it can be an empty array
    studySlots: z.array(timeSlotSchema).default([]), // Ensuring it can be an empty array
  }),
});

export const ScheduleValidation = {
  CreateScheduleSchema,
  UpdateScheduleSchema,
};
