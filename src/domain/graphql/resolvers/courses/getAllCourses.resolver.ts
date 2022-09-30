import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { IGetAllCoursesContract } from 'src/domain/contracts/courses/getAllCourses.contract';
import { IGetAllCoursesFeature } from 'src/domain/features/courses/getAllCoures.feature';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { Course } from '../../models/course';

@Resolver(() => Course)
export class GetAllCoursesResolver implements IGetAllCoursesFeature {
  constructor(
    @Inject('IGetAllCoursesContract')
    private readonly coursesRepository: IGetAllCoursesContract,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  public async getAllCourses(): Promise<IGetAllCoursesFeature.Output> {
    return await this.coursesRepository.findAll();
  }
}
