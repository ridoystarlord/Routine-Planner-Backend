import { prismaClient } from '../../../Database';

export class UserService {
  public static async getUserProfile(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
  }
}
