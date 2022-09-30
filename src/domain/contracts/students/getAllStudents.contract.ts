import { Enrollment, Student } from '@prisma/client';

export interface IGetAllStudentsContract {
  findStudents: () => Promise<IGetAllStudentsContract.OutputStudents>;
  findEnrollmentsByStudent: (
    studentId: string,
  ) => Promise<IGetAllStudentsContract.OutputEnrollments>;
}

export namespace IGetAllStudentsContract {
  export type OutputStudents = Student[];
  export type OutputEnrollments = Enrollment[];
}
