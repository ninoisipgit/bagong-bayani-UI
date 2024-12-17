export interface UserProfile {
  userId?: number;
  id?: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  suffix?: string; // Optional
  birthdate: Date;
  gender: string;
  civilStatus?: string; // Optional
  passportNo?: string; // Optional
  foreignaddress?: string; // Optional
  country?: string; // Optional
  contactnoabroad?: string; // Optional
  religion?: string; // Optional
  educationalAttainment?: string; // Optional
  course?: string; // Optional
  addressID?: number; // Optional
  employmentDetailsID?: string; // Optional
  tags?: string; // Optional
  cv?: any;
  languages?: string;
  aboutMe?: string;
}
