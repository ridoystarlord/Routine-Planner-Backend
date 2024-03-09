import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../../../Database';
import ApiError from '../../../errors/ApiError';

export class ScheduleService {
  public static async addASingleDaySchedule(userId: string, payload: any) {
    try {
      const { date, classes, jobs, studySlots } = payload;

      // Insert class schedules
      for (const classTime of classes) {
        await prismaClient.schedule.create({
          data: {
            type: 'class',
            userId,
            startTime: new Date(`${date}T${classTime.startTime}:00`),
            endTime: new Date(`${date}T${classTime.endTime}:00`),
          },
        });
      }

      // Insert job schedules
      for (const jobTime of jobs) {
        await prismaClient.schedule.create({
          data: {
            userId,
            type: 'work',
            startTime: new Date(`${date}T${jobTime.startTime}:00`),
            endTime: new Date(`${date}T${jobTime.endTime}:00`),
          },
        });
      }

      // Insert study slots
      for (const studySlot of studySlots) {
        await prismaClient.studySlot.create({
          data: {
            userId,
            startTime: new Date(`${date}T${studySlot.startTime}:00`),
            endTime: new Date(`${date}T${studySlot.endTime}:00`),
          },
        });
      }
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to Create schedule.'
      );
    }
  }
  public static async getAllSchedules(userId: string) {
    return prismaClient.schedule.findMany({ where: { userId } });
  }
  public static updateScheduleById(userId: string, id: string, payload: any) {
    return prismaClient.schedule.update({
      where: { id, userId },
      data: { ...payload },
    });
  }
  public static deleteScheduleById(userId: string, id: string) {
    return prismaClient.schedule.delete({
      where: { id, userId },
    });
  }
}
