import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobDetails } from 'src/app/shared/models/job-details';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent  implements OnInit{
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date_posted: ['', Validators.required],
      valid_through: [null],
      employment_type: ['', [Validators.required, Validators.maxLength(255)]],
      hiring_organization_name: ['', [Validators.required, Validators.maxLength(255)]],
      hiring_organization_same_as: ['', Validators.maxLength(255)],
      hiring_organization_logo: ['', Validators.maxLength(255)],
      job_location_street_address: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_locality: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_region: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_postal_code: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_country: ['', [Validators.required, Validators.maxLength(255)]],
      base_salary_value: [null, Validators.required],
      base_salary_currency: ['', [Validators.required, Validators.maxLength(3)]],
      base_salary_unit_text: ['', Validators.maxLength(255)],
      job_benefits: [''],
      responsibilities: [''],
      qualifications: [''],
      skills: [''],
      industry: ['', Validators.maxLength(255)],
      applicant_location_requirements: ['', Validators.maxLength(255)],
      job_location_type: ['', Validators.maxLength(255)],
      work_hours: ['', Validators.maxLength(255)],
      tags: ['', Validators.maxLength(255)],
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const jobDetails: JobDetails = this.jobForm.value;
      console.log(jobDetails);
    }
  }

   // Helper method to check if a form control is invalid and touched
   isInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control !== null && control !== undefined && control.invalid && (control.dirty || control.touched);
  }
}
