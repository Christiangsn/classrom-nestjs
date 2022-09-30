import { CreateCourseInput } from 'src/domain/graphql/inputs/createCurse.input';
import { Course } from 'src/domain/graphql/models/course';

export interface ICreateCourseFeature {
  createCourse: (
    data: ICreateCourseFeature.Input,
  ) => Promise<ICreateCourseFeature.Output>;
}

export namespace ICreateCourseFeature {
  export type Input = CreateCourseInput;
  export type Output = Course;
}
