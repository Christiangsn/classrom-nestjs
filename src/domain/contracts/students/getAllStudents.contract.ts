import { Student } from '@prisma/client';
import { StdioNull } from 'child_process';

export interface IGetAllStudentsContract {
  findAll: () => Promise<IGetAllStudentsContract.Output>;
}

export namespace IGetAllStudentsContract {
  export type Output = Student[];
}
