import { Student } from '@prisma/client';

export interface ICreateStudentContract {
  create: (authUserId: string) => Promise<Student>;
}
