import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../../../Database';
import ApiError from '../../../errors/ApiError';

export class StudyService {
  public static async addTopic(userId: string, payload: any) {
    try {
      const { topic, priority, duration } = payload;

      return prismaClient.studyTopic.create({
        data: {
          userId,
          topic,
          priority,
          duration,
        },
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to Create Topic.'
      );
    }
  }
}
