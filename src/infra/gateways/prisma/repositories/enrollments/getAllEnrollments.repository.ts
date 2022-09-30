import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import { IGetAllEnrollmentContract } from 'src/domain/contracts/enrollments/getAllEnrollment.contract';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

@Injectable()
export class GetAllEnrollmentRepository implements IGetAllEnrollmentContract {
  constructor(private readonly prisma: PrismaService) {}

  public async findEnrollments(): Promise<IGetAllEnrollmentContract.OutputEnrollment> {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  public async findCourseById(
    id: string,
  ): Promise<IGetAllEnrollmentContract.OutputCourse> {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  public async findStudentById(
    id: string,
  ): Promise<IGetAllEnrollmentContract.OutputStudent> {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
