import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { IGetAllStudentsContract } from 'src/domain/contracts/students/getAllStudents.contract';
import { IGetAllStudentsFeature } from 'src/domain/features/students/getAllStudents.feature';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { Student } from '../../models/student';

@Resolver(() => Student)
export class GetAllStudentsResolver implements IGetAllStudentsFeature {
  constructor(
    @Inject('IGetAllStudentsContract')
    private readonly studentsRepository: IGetAllStudentsContract,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  public async getAllStudents(): Promise<IGetAllStudentsFeature.Output> {
    return await this.studentsRepository.findAll();
  }
}
