import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IGetAllEnrollmentContract } from 'src/domain/contracts/enrollments/getAllEnrollment.contract';

import { IGetAllEnrollmentsFeature } from 'src/domain/features/enrollments/getAllEnrollment.feature';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { Enrollment } from '../../models/enrollment';

@Resolver(() => Enrollment)
export class GetAllEnrollmentsResolver implements IGetAllEnrollmentsFeature {
  constructor(
    @Inject('IGetAllEnrollmentContract')
    private readonly getEnrollmentInformationsRepository: IGetAllEnrollmentContract,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  public async enrollments(): Promise<IGetAllEnrollmentsFeature.OutputEnrollment> {
    return this.getEnrollmentInformationsRepository.findEnrollments();
  }

  @ResolveField()
  protected async student(@Parent() enrollment: Enrollment) {
    return this.getEnrollmentInformationsRepository.findStudentById(
      enrollment.studentId,
    );
  }

  @ResolveField()
  protected async course(@Parent() enrollment: Enrollment) {
    return this.getEnrollmentInformationsRepository.findCourseById(
      enrollment.courseId,
    );
  }
}
