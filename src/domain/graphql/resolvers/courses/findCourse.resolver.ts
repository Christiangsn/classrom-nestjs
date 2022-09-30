import { AuthUser } from './../../../middlewares/currentUser.decorator';
import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { CurrentUser } from 'src/domain/middlewares/currentUser.decorator';
import { IFindOneCourseContract } from 'src/infra/gateways/prisma/repositories/courses/findCourseStudent.repository';
import { Course } from '../../models/course';

export interface IGetCourseFeature {
  course: (id: string, user: AuthUser) => Promise<Course>;
}

@Resolver(() => Course)
export class FindOneCourseResolver implements IGetCourseFeature {
  constructor(
    @Inject('coursesRepository')
    private readonly coursesRepository: IFindOneCourseContract,
  ) {}

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  public async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<Course> {
    const student = await this.coursesRepository.findStudent(user.sub);
    if (!student) throw new Error('Student not found');

    const enrollment = await this.coursesRepository.accessCourse({
      courseId: id,
      studentId: student.id,
    });
    if (!enrollment) throw new UnauthorizedException();

    return this.coursesRepository.findOne(id);
  }
}
