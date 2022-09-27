import { GetAllStudentsResolver } from './graphql/resolvers/students/getAllStudents.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { InfraModule } from 'src/infra/infra.module';

import { resolve } from 'path';
import { GetAllStudentsRepository } from 'src/infra/gateways/prisma/repositories/students/getAllStudents.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    EnrollmentsResolver,
    GetAllStudentsResolver,
    { provide: 'IGetAllStudentsContract', useClass: GetAllStudentsRepository },
  ],
})
export class DomainModule {}
