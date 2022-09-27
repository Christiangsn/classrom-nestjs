import { PrismaService } from './../../../connections/prisma.service';
import { Injectable } from '@nestjs/common';
import { StdioNull } from 'child_process';
import { IGetAllStudentsContract } from 'src/domain/contracts/students/getAllStudents.contract';

@Injectable()
export class GetAllStudentsRepository implements IGetAllStudentsContract {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<IGetAllStudentsContract.Output> {
    return this.prisma.student.findMany();
  }
}
