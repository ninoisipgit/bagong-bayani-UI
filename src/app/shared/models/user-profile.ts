export interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix?: string; // Optional
  birthdate: Date;
  gender: string;
  civilStatus?: string; // Optional
  religion?: string; // Optional
  educationalAttainment?: string; // Optional
  course?: string; // Optional
  addressID?: number; // Optional
  employmentDetailsID?: string; // Optional
  tags?: string; // Optional
}
