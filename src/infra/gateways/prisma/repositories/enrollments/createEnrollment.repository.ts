import { Injectable } from '@nestjs/common';
import { ICreateEnrollmentContract } from 'src/domain/contracts/enrollments/createEnrollment.contract';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

@Injectable()
export class CreateEnrollmentRepository implements ICreateEnrollmentContract {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    courseId,
    studentId,
  }: ICreateEnrollmentContract.Input): Promise<ICreateEnrollmentContract.Output> {
    return await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
