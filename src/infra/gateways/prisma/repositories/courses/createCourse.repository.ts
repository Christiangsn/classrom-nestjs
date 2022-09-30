import { Injectable } from '@nestjs/common';
import { ICreateCourseContract } from 'src/domain/contracts/courses/createCourse.contract';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

@Injectable()
export class CreateCourseRepository implements ICreateCourseContract {
  constructor(private readonly prisma: PrismaService) {}

  public async verifySlug(slug: string): Promise<boolean> {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    return courseAlreadyExists ? true : false;
  }

  public async create({
    title,
    slug,
  }: ICreateCourseContract.InputCreateCourse): Promise<ICreateCourseContract.OutputCreateCourse> {
    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
