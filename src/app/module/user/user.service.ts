import { createHmac } from 'node:crypto';
import { prismaClient } from '../../../Database';

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
  public static async updateUser(id: string, payload: any) {
    return prismaClient.user.update({ where: { id }, data: { ...payload } });
  }
}
