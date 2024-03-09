import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'node:crypto';
import { prismaClient } from '../../../Database';
import ApiError from '../../../errors/ApiError';

export class UserService {
  public static getUserFromEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }
  public static getUserFromID(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
  }
  public static getHashFromPassword(salt: string, password: string) {
    return createHmac('sha256', salt).update(password).digest('hex');
  }
  public static async getUserProfile(id: string) {
    return UserService.getUserFromID(id);
  }
  public static async generateStudyPlan(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    try {
      if (!startDate || !endDate) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'Please provide both startDate and endDate'
        );
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'startDate must be before endDate'
        );
      }

      // Fetch study slots within the user-defined range
      const studySlots = await prismaClient.studySlot.findMany({
        where: {
          userId,
          startTime: {
            gte: start,
            lte: end,
          },
        },
        orderBy: { startTime: 'asc' },
      });

      // Fetch study topics, ordered by priority
      const studyTopics = await prismaClient.studyTopic.findMany({
        where: { userId },
        orderBy: { priority: 'asc' },
      });

      const plan: any = [];
      const currentDayStart = new Date(start);

      // Loop through each day in the range
      while (currentDayStart <= end) {
        const currentDayEnd = new Date(currentDayStart);
        currentDayEnd.setHours(23, 59, 59, 999); // End of the current day

        // Filter slots for the current day
        const dailySlots = studySlots.filter(slot => {
          const slotStart = new Date(slot.startTime);
          return slotStart >= currentDayStart && slotStart <= currentDayEnd;
        });

        // Allocate topics to slots as before, but for the current day's slots
        dailySlots.forEach(slot => {
          const slotStart = new Date(slot.startTime).getTime();
          const slotEnd = new Date(slot.endTime).getTime();
          let slotDuration = (slotEnd - slotStart) / 60000; // Convert to minutes

          while (slotDuration > 0 && studyTopics.length > 0) {
            const currentTopic = studyTopics[0];

            if (currentTopic.duration <= slotDuration) {
              plan.push({
                date: currentDayStart.toISOString().split('T')[0], // Only date part
                ...slot,
                topic: currentTopic.topic,
                duration: currentTopic.duration,
              });

              slotDuration -= currentTopic.duration;
              studyTopics.shift();
            } else {
              break;
            }
          }
        });

        // Move to the next day
        currentDayStart.setDate(currentDayStart.getDate() + 1);
        currentDayStart.setHours(0, 0, 0, 0); // Reset hours for the start of the next day
      }

      return plan;
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
  }
}
