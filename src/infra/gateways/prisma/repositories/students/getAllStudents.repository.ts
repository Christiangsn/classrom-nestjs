import { PrismaService } from './../../../connections/prisma.service';
import { Injectable } from '@nestjs/common';
import { IGetAllStudentsContract } from 'src/domain/contracts/students/getAllStudents.contract';

@Injectable()
export class GetAllStudentsRepository implements IGetAllStudentsContract {
  constructor(private readonly prisma: PrismaService) {}

  public async findStudents(): Promise<IGetAllStudentsContract.OutputStudents> {
    return this.prisma.student.findMany();
  }

  public async findEnrollmentsByStudent(
    studentId: string,
  ): Promise<IGetAllStudentsContract.OutputEnrollments> {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }
}
