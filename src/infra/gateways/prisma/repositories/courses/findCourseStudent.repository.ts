import { Injectable } from '@nestjs/common';
import { Course, Student } from '@prisma/client';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

export interface IFindOneCourseContract {
  findOne: (id: string) => Promise<Course>;
  findStudent: (authUserId: string) => Promise<Student>;
  accessCourse: (
    props: IFindOneCourseContract.InputAccessCourse,
  ) => Promise<IFindOneCourseContract.OutputAcessCourse>;
}

export namespace IFindOneCourseContract {
  export type InputAccessCourse = {
    courseId: string;
    studentId: string;
  };
  export type OutputAcessCourse = boolean;
}

@Injectable()
export class FindOneCourseRepository implements IFindOneCourseContract {
  constructor(private readonly prisma: PrismaService) {}
  public async findStudent(authUserId: string): Promise<Student> {
    return await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  public async findOne(id: string): Promise<Course> {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  public async accessCourse({
    courseId,
    studentId,
  }: IFindOneCourseContract.InputAccessCourse): Promise<IFindOneCourseContract.OutputAcessCourse> {
    const permissionStudentByCourse = await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });

    return permissionStudentByCourse ? true : false;
  }
}
