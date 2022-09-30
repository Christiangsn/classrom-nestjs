import { Course, Enrollment, Student } from '@prisma/client';

export interface IGetAllEnrollmentContract {
  findEnrollments: () => Promise<IGetAllEnrollmentContract.OutputEnrollment>;
  findCourseById: (
    id: string,
  ) => Promise<IGetAllEnrollmentContract.OutputCourse>;
  findStudentById: (
    id: string,
  ) => Promise<IGetAllEnrollmentContract.OutputStudent>;
}

export namespace IGetAllEnrollmentContract {
  export type OutputEnrollment = Enrollment[];
  export type OutputCourse = Course;
  export type OutputStudent = Student;
}
