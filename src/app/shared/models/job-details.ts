export interface JobDetails {
  title: string;
  description: string;
  date_posted: Date;
  valid_through?: Date;
  employment_type: string;
  hiring_organization_name: string;
  hiring_organization_same_as?: string;
  hiring_organization_logo?: string;
  job_location_street_address: string;
  job_location_address_locality: string;
  job_location_address_region: string;
  job_location_postal_code: string;
  job_location_address_country: string;
  base_salary_value: number;
  base_salary_currency: string;
  base_salary_unit_text?: string;
  job_benefits?: string;
  responsibilities?: string;
  qualifications?: string;
  skills?: string;
  industry?: string;
  applicant_location_requirements?: string;
  job_location_type?: string;
  work_hours?: string;
  tags?: string;
  status?: number;
}
