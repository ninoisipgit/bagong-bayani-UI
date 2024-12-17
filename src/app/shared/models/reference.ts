export interface Reference {
  id?: Number;
  personID: string;
  Name?: string;
  position: string;
  organization: string;
  phone_number: string;
  email: string;
  status?: boolean; // This is optional as per your request validation
}
