import { z } from 'zod';

const CreateStudyTopic = z.object({
  body: z.object({
    topic: z.string({ required_error: 'Topic Title is required' }),
    priority: z.number({ required_error: 'Priority is required' }),
    duration: z.number({ required_error: 'Duration is required' }),
  }),
});

const UpdateStudyTopic = z.object({
  body: z.object({
    topic: z.string({ required_error: 'Topic Title is required' }).optional(),
    priority: z.number({ required_error: 'Priority is required' }).optional(),
    duration: z.number({ required_error: 'Duration is required' }).optional(),
    isComplete: z
      .boolean({ required_error: 'Complete mark is required' })
      .optional(),
  }),
});

const GenerateStudyPlan = z.object({
  query: z.object({
    startDate: z.string({ required_error: 'Start Date is required' }),
    endDate: z.string({ required_error: 'End Date is required' }),
  }),
});

export const StudyValidation = {
  CreateStudyTopic,
  UpdateStudyTopic,
  GenerateStudyPlan,
};
