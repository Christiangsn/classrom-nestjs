import { Course } from 'src/domain/graphql/models/course';

export interface IGetAllCoursesFeature {
  getAllCourses: () => Promise<IGetAllCoursesFeature.Output>;
}

export namespace IGetAllCoursesFeature {
  export type Output = Course[];
}
