import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import { IGetCourseBySlugContract } from 'src/domain/contracts/courses/getCourseBySlug.contract';
import { PrismaService } from 'src/infra/gateways/connections/prisma.service';

@Injectable()
export class GetCourseBySlugRepository implements IGetCourseBySlugContract {
  constructor(private readonly prisma: PrismaService) {}

  public async getCourseBySlug(slug: string): Promise<Course> {
    return await this.prisma.course.findUnique({
      where: { slug },
    });
  }
}
