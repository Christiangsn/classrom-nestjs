import { Enrollment } from '@prisma/client';
export interface ICreateEnrollmentContract {
  create: (
    props: ICreateEnrollmentContract.Input,
  ) => Promise<ICreateEnrollmentContract.Output>;
}

export namespace ICreateEnrollmentContract {
  export type Input = {
    courseId: string;
    studentId: string;
  };
  export type Output = Enrollment;
}
