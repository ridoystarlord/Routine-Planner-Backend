import { Schedule } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../../../Database';
import ApiError from '../../../errors/ApiError';

export class ScheduleService {
  public static async addASingleDaySchedule(userId: string, payload: any) {
    try {
      const { date, classes, jobs, studySlots } = payload;

      await prismaClient.$transaction(async prismaTransactionClient => {
        // Insert class schedules
        for (const classTime of classes) {
          await prismaTransactionClient.schedule.create({
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
          await prismaTransactionClient.schedule.create({
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
          await prismaTransactionClient.studySlot.create({
            data: {
              userId,
              startTime: new Date(`${date}T${studySlot.startTime}:00`),
              endTime: new Date(`${date}T${studySlot.endTime}:00`),
            },
          });
        }
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to Create schedule.'
      );
    }
  }
  public static async getAllSchedules(userId: string): Promise<Schedule[]> {
    return prismaClient.schedule.findMany({ where: { userId } });
  }
  public static async updateScheduleById(
    userId: string,
    id: string,
    payload: any
  ): Promise<Schedule> {
    try {
      const schedule = await prismaClient.schedule.findUnique({
        where: { id, userId },
      });
      if (!schedule) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Schedule not found');
      }
      return prismaClient.schedule.update({
        where: { id, userId },
        data: { ...payload },
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
  }
  public static async deleteScheduleById(
    userId: string,
    id: string
  ): Promise<Schedule> {
    try {
      const schedule = await prismaClient.schedule.findUnique({
        where: { id, userId },
      });
      if (!schedule) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Schedule not found');
      }
      return prismaClient.schedule.delete({
        where: { id, userId },
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
  }
}
