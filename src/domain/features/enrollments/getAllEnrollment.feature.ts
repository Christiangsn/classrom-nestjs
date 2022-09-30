import { Enrollment } from 'src/domain/graphql/models/enrollment';

export interface IGetAllEnrollmentsFeature {
  enrollments: () => Promise<IGetAllEnrollmentsFeature.OutputEnrollment>;
}

export namespace IGetAllEnrollmentsFeature {
  export type OutputEnrollment = Enrollment[];
}
