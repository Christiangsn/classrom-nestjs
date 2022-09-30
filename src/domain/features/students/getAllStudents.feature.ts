import { Student } from 'src/domain/graphql/models/student';

export interface IGetAllStudentsFeature {
  students: () => Promise<IGetAllStudentsFeature.Output>;
}

export namespace IGetAllStudentsFeature {
  export type Output = Student[];
}
