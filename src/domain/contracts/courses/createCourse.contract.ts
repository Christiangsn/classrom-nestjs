import { Course } from '@prisma/client';

export interface ICreateCourseContract {
  create: (
    props: ICreateCourseContract.InputCreateCourse,
  ) => Promise<ICreateCourseContract.OutputCreateCourse>;
  verifySlug: (slug: string) => Promise<boolean>;
}

export namespace ICreateCourseContract {
  export type InputCreateCourse = {
    title: string;
    slug: string;
  };
  export type OutputCreateCourse = Course;
}
