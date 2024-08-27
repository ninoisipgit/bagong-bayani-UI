import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent  implements OnInit{
  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      employmentType: ['', Validators.required],
      salaryRange: [''],
      jobDescription: [''],
      skills: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      // Handle form submission
      console.log(this.jobForm.value);
    }
  }

}
