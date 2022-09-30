import { AuthUser } from '../../../middlewares/currentUser.decorator';
import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/domain/middlewares/currentUser.decorator';
import { Student } from '../../models/student';
import { IMeStudentContract } from 'src/infra/gateways/prisma/repositories/students/meStudent.repository';
import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';

export interface IMeCoursesStudent {
  me: (user: AuthUser) => Promise<Student>;
}

@Resolver(() => Student)
export class MeStudentResolver implements IMeCoursesStudent {
  constructor(
    @Inject('meStudentRepository')
    private readonly meStudentRepository: IMeStudentContract,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  public async me(@CurrentUser() user: AuthUser): Promise<Student> {
    const studentMe = await this.meStudentRepository.findStudentByAuthId(
      user.sub,
    );

    console.log('studentMe', studentMe);
    return studentMe;
  }
}
