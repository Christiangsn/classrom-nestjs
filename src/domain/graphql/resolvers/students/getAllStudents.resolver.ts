import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IGetAllStudentsContract } from 'src/domain/contracts/students/getAllStudents.contract';
import { IGetAllStudentsFeature } from 'src/domain/features/students/getAllStudents.feature';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { Enrollment } from '../../models/enrollment';
import { Student } from '../../models/student';

@Resolver(() => Student)
export class GetAllStudentsResolver implements IGetAllStudentsFeature {
  constructor(
    @Inject('IGetAllStudentsContract')
    private readonly getStudentsInformationsRepository: IGetAllStudentsContract,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  public async students(): Promise<IGetAllStudentsFeature.Output> {
    return await this.getStudentsInformationsRepository.findStudents();
  }

  @ResolveField()
  private async enrollment(@Parent() student: Student): Promise<Enrollment[]> {
    return await this.getStudentsInformationsRepository.findEnrollmentsByStudent(
      student.id,
    );
  }
}
