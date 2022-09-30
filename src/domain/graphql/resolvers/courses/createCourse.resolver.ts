import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ICreateCourseContract } from 'src/domain/contracts/courses/createCourse.contract';
import { ICreateCourseFeature } from 'src/domain/features/courses/createCourse.feature';

import { AuthorizationGuard } from 'src/domain/middlewares/authorization.guard';
import { IGenerationSlug } from 'src/infra/gateways/generators/slugify.contract';
import { CreateCourseInput } from '../../inputs/createCurse.input';
import { Course } from '../../models/course';

@Resolver(() => Course)
export class CreateCourseResolver implements ICreateCourseFeature {
  constructor(
    @Inject('GeneratorSlugify')
    private readonly slugify: IGenerationSlug,
    @Inject('createCourseRepository')
    private readonly createCourseRepository: ICreateCourseContract,
  ) {}

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  public async createCourse(
    @Args('data') data: CreateCourseInput,
  ): Promise<ICreateCourseFeature.Output> {
    const slug = this.slugify.generation(data.title);

    const existsSlug = await this.createCourseRepository.verifySlug(slug);
    if (existsSlug) throw new Error('Course already exists');

    return await this.createCourseRepository.create({
      slug,
      title: data.title,
    });
  }
}
