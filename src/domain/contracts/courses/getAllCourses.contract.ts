import { Course } from '@prisma/client';

export interface IGetAllCoursesContract {
  findAll: () => Promise<IGetAllCoursesContract.Output>;
}

export namespace IGetAllCoursesContract {
  export type Output = Course[];
}
