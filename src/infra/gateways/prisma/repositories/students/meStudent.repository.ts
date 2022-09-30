import { PrismaService } from './../../../connections/prisma.service';
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';

export interface IMeStudentContract {
  findStudentByAuthId(authUserId: string): Promise<Student>;
}

@Injectable()
export class MeStudentRepository implements IMeStudentContract {
  constructor(private readonly prisma: PrismaService) {}

  public async findStudentByAuthId(authUserId: string): Promise<Student> {
    return await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
