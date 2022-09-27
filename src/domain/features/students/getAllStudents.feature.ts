import { Student } from 'src/domain/graphql/models/student';

export interface IGetAllStudentsFeature {
  getAllStudents: () => Promise<IGetAllStudentsFeature.Output>;
}

export namespace IGetAllStudentsFeature {
  export type Output = Student[];
}
