import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { ICreateStudentContract } from 'src/domain/contracts/students/createStudent.contract';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

@Injectable()
export class CreateStudentRepository implements ICreateStudentContract {
  constructor(private readonly prisma: PrismaService) {}
  public async create(authUserId: string): Promise<Student> {
    return await this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
