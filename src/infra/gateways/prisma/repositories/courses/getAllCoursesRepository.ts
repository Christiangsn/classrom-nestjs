import { PrismaService } from './../../../connections/prisma.service';
import { Injectable } from '@nestjs/common';
import { IGetAllCoursesContract } from 'src/domain/contracts/courses/getAllCourses.contract';

@Injectable()
export class GetAllCoursesRepository implements IGetAllCoursesContract {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<IGetAllCoursesContract.Output> {
    return this.prisma.course.findMany();
  }
}
