import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IGenerationSlug } from 'src/infra/gateways/generators/slugify.contract';
import { IMeStudentContract } from 'src/infra/gateways/prisma/repositories/students/meStudent.repository';
import { ICreateCourseContract } from '../contracts/courses/createCourse.contract';
import { IGetCourseBySlugContract } from '../contracts/courses/getCourseBySlug.contract';
import { ICreateEnrollmentContract } from '../contracts/enrollments/createEnrollment.contract';
import { ICreateStudentContract } from '../contracts/students/createStudent.contract';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface IRootPurchaseCreated {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurscheKafkaController {
  constructor(
    @Inject('meStudentRepository')
    private readonly meStudentRepository: IMeStudentContract,
    @Inject('createStudentRepository')
    private readonly createStudentRepository: ICreateStudentContract,
    @Inject('getCourseBySlugRepository')
    private readonly getCourseBySlugRepository: IGetCourseBySlugContract,
    @Inject('GeneratorSlugify')
    private readonly slugify: IGenerationSlug,
    @Inject('createCourseRepository')
    private readonly createCourseRepository: ICreateCourseContract,
    @Inject('createEnrollmentRepository')
    private readonly createEnrollmentRepository: ICreateEnrollmentContract,
  ) {}

  @EventPattern('purchases.new-purchase')
  public async purchaseCreated(
    @Payload() payload: IRootPurchaseCreated,
  ): Promise<void> {
    let student = await this.meStudentRepository.findStudentByAuthId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.createStudentRepository.create(
        payload.customer.authUserId,
      );
    }

    let course = await this.getCourseBySlugRepository.getCourseBySlug(
      payload.product.slug,
    );
    if (!course) {
      const slug =
        payload.product.slug ?? this.slugify.generation(payload.product.title);
      course = await this.createCourseRepository.create({
        title: payload.product.title,
        slug: slug,
      });
    }

    await this.createEnrollmentRepository.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
