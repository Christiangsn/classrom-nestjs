import { Course } from '@prisma/client';

export interface IGetCourseBySlugContract {
  getCourseBySlug(slug: string): Promise<Course>;
}
