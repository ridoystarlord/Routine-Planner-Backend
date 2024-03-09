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
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);

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
        orderBy: [
          { priority: 'asc' },
          { duration: 'asc' }, // Assuming shorter durations should come first
        ],
      });

      const plan: any = [];
      const currentDayStart = new Date(start);
      let carryOverTopic = null;

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
        for (const slot of dailySlots) {
          const slotStart = new Date(slot.startTime).getTime();
          const slotEnd = new Date(slot.endTime).getTime();
          let slotDuration = (slotEnd - slotStart) / 60000; // Convert to minutes

          if (carryOverTopic) {
            const topicToAllocate = carryOverTopic;
            const durationToAllocate = Math.min(
              topicToAllocate.remainingDuration,
              slotDuration
            );

            plan.push({
              date: currentDayStart.toISOString().split('T')[0], // Only date part
              startTime: slot.startTime,
              endTime: new Date(
                slotStart + durationToAllocate * 60000
              ).toISOString(),
              topic: topicToAllocate.topic,
              duration: durationToAllocate,
            });

            topicToAllocate.remainingDuration -= durationToAllocate;
            slotDuration -= durationToAllocate;

            if (topicToAllocate.remainingDuration <= 0) {
              carryOverTopic = null;
            }
          }

          while (slotDuration > 0 && studyTopics.length > 0) {
            const currentTopic: any = carryOverTopic || studyTopics.shift();
            currentTopic.remainingDuration =
              currentTopic.remainingDuration || currentTopic.duration;

            const durationToAllocate = Math.min(
              currentTopic.remainingDuration,
              slotDuration
            );

            plan.push({
              date: new Date(slot.startTime).toISOString().split('T')[0],
              startTime: new Date(slotEnd - slotDuration * 60000).toISOString(),
              endTime: new Date(
                slotEnd - (slotDuration - durationToAllocate) * 60000
              ).toISOString(),
              topic: currentTopic.topic,
              duration: durationToAllocate,
            });

            currentTopic.remainingDuration -= durationToAllocate;
            slotDuration -= durationToAllocate;

            if (currentTopic.remainingDuration > 0) {
              carryOverTopic = currentTopic;
              break; // Exit the while loop as the current slot is exhausted
            } else {
              carryOverTopic = null;
            }
          }
        }

        // Move to the next day
        currentDayStart.setDate(currentDayStart.getDate() + 1);
        currentDayStart.setUTCHours(0, 0, 0, 0); // Reset hours for the start of the next day
      }

      return plan;
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
  }

  public static async getAllTopics(userId: string) {
    return prismaClient.studyTopic.findMany({
      where: {
        userId,
      },
    });
  }
  public static async updateTopicById(
    userId: string,
    id: string,
    payload: any
  ) {
    return prismaClient.studyTopic.update({
      where: { id, userId },
      data: { ...payload },
    });
  }
  public static deleteTopicById(userId: string, id: string) {
    return prismaClient.studyTopic.delete({
      where: { id, userId },
    });
  }
}
