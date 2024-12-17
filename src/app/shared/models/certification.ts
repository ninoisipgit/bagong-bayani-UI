export interface Certification {
  id?: number;
  personID: number;
  certification_award: string;
  organization: string;
  startDate: string;
  endDate: string;
  status?: boolean;
}
