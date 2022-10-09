import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { InfraModule } from 'src/infra/infra.module';

import { resolve } from 'path';
import { GetAllStudentsRepository } from 'src/infra/gateways/prisma/repositories/students/getAllStudents.repository';
import { GetAllCoursesRepository } from 'src/infra/gateways/prisma/repositories/courses/getAllCoursesRepository';
import { GetAllCoursesResolver } from './graphql/resolvers/courses/getAllCourses.resolver';
import { GetAllStudentsResolver } from './graphql/resolvers/students/getAllStudents.resolver';
import { GetAllEnrollmentsResolver } from './graphql/resolvers/enrollments/getAllEnrollments.resolver';
import { GetAllEnrollmentRepository } from 'src/infra/gateways/prisma/repositories/enrollments/getAllEnrollments.repository';
import { SlugGenerator } from 'src/infra/gateways/generators/slugify';
import { CreateCourseRepository } from 'src/infra/gateways/prisma/repositories/courses/createCourse.repository';
import { CreateCourseResolver } from './graphql/resolvers/courses/createCourse.resolver';
import { MeStudentRepository } from 'src/infra/gateways/prisma/repositories/students/meStudent.repository';
import { FindOneCourseResolver } from './graphql/resolvers/courses/findCourse.resolver';
import { FindOneCourseRepository } from 'src/infra/gateways/prisma/repositories/courses/findCourseStudent.repository';
import { PurscheKafkaController } from './kafka/purchases.controller';
import { CreateStudentRepository } from 'src/infra/gateways/prisma/repositories/students/createStudent.repository';
import { CreateEnrollmentRepository } from 'src/infra/gateways/prisma/repositories/enrollments/createEnrollment.repository';
import { GetCourseBySlugRepository } from 'src/infra/gateways/prisma/repositories/courses/getCourseBySlug.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [PurscheKafkaController],
  providers: [
    // Resolvers...
    GetAllCoursesResolver,
    GetAllStudentsResolver,
    GetAllEnrollmentsResolver,
    CreateCourseResolver,
    // MeStudentResolver,
    FindOneCourseResolver,
    // Injectors
    { provide: 'IGetAllStudentsContract', useClass: GetAllStudentsRepository },
    { provide: 'IGetAllCoursesContract', useClass: GetAllCoursesRepository },
    {
      provide: 'IGetAllEnrollmentContract',
      useClass: GetAllEnrollmentRepository,
    },
    { provide: 'GeneratorSlugify', useClass: SlugGenerator },
    { provide: 'createCourseRepository', useClass: CreateCourseRepository },
    { provide: 'meStudentRepository', useClass: MeStudentRepository },
    { provide: 'coursesRepository', useClass: FindOneCourseRepository },
    { provide: 'createStudentRepository', useClass: CreateStudentRepository },
    {
      provide: 'getCourseBySlugRepository',
      useClass: GetCourseBySlugRepository,
    },
    {
      provide: 'createEnrollmentRepository',
      useClass: CreateEnrollmentRepository,
    },
  ],
})
export class DomainModule {}
