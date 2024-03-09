import { z } from 'zod';

const GenerateStudyPlan = z.object({
  query: z.object({
    startDate: z.string({ required_error: 'Start Date is required' }),
    endDate: z.string({ required_error: 'End Date is required' }),
  }),
});

export const StudyValidation = {
  GenerateStudyPlan,
};
