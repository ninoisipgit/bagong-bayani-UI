import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EmployerDetails } from 'src/app/shared/models/employer-details';
import { EmailData, JobDetails } from 'src/app/shared/models/job-details';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent  implements OnInit{
  jobForm!: FormGroup;
  jobId:number = 0;

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  employerDetails!: EmployerDetails
  readonly: boolean = false
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService : AuthService,
    private jobService:JobService,
    private router: Router,
    private userDetailsService: UserDetailsService,
    private toastrService: NbToastrService
  ) {


    this.jobForm = this.fb.group({
      id: [''],
      postedby: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date_posted: ['', Validators.required],
      valid_through: [null],
      employment_type: ['', [Validators.required, Validators.maxLength(255)]],
      hiring_organization_name: [this.employerDetails?.companyName, [Validators.required, Validators.maxLength(255)]],
      hiring_organization_same_as: ['', Validators.maxLength(255)],
      hiring_organization_logo: ['', Validators.maxLength(255)],
      job_location_street_address: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_locality: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_region: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_postal_code: ['', [Validators.required, Validators.maxLength(255)]],
      job_location_address_country: ['', [Validators.required, Validators.maxLength(255)]],
      base_salary_value: [null, Validators.required],
      base_salary_currency: ['', [Validators.required, Validators.maxLength(3)]],
      base_salary_unit_text: [''],
      job_benefits: [''],
      responsibilities: [''],
      qualifications: [''],
      skills: [''],
      industry: [''],
      applicant_location_requirements: [''],
      job_location_type: [''],
      work_hours: [''],
      tags: [''],
      status: [0],
      comments: ['']
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      if(this.user._type == 3){
        this.readonly = true
      }
      this.isAuthenticated = !!user;
      this.jobForm.patchValue({
        postedby:  this.user._id
      });
    });
    this.route.paramMap.subscribe(params => {
      this.jobId = Number(params.get('id'));
      console.log(this.jobId);
    });

    this.userDetailsService.getEmployerDetails(this.user._id).subscribe(
      (details: EmployerDetails) => {
        this.employerDetails = details;
        this.jobForm.patchValue({
          hiring_organization_name:  details.companyName,
          hiring_organization_logo:  details.logo,
          hiring_organization_same_as : details.same_as
        })
      },
      (error) => {
        console.error('Error fetching company details', error);
      }
    );

  }

  ngOnInit(): void {
    if(this.jobId > 0){
      this.jobService.getJobDetails(this.jobId).subscribe((response) => {
        const skills = response.skills?.split(',').map((item: string) => {
          const trimmedItem = item.trim();
          return { display: trimmedItem, value: trimmedItem };
        });
        this.jobForm.patchValue({
          id:  response.id,
          postedby:  response.postedby,
          title: response.title,
          description: response.description,
          date_posted: response.date_posted,
          valid_through: response.valid_through,
          employment_type: response.employment_type,
          hiring_organization_name: response.hiring_organization_name,
          hiring_organization_same_as: response.hiring_organization_same_as,
          hiring_organization_logo: response.hiring_organization_logo,
          job_location_street_address: response.job_location_street_address,
          job_location_address_locality: response.job_location_address_locality,
          job_location_address_region: response.job_location_address_region,
          job_location_postal_code: response.job_location_postal_code,
          job_location_address_country: response.job_location_address_country,
          base_salary_value: response.base_salary_value,
          base_salary_currency: response.base_salary_currency,
          base_salary_unit_text: response.base_salary_unit_text,
          job_benefits: response.job_benefits,
          responsibilities: response.responsibilities,
          qualifications: response.qualifications,
          skills: skills,
          industry: response.industry,
          applicant_location_requirements: response.applicant_location_requirements,
          job_location_type: response.job_location_type,
          work_hours: response.work_hours,
          tags: response.tags,
          status: response.status,
          comments: response.comments

        });
      });
    }

  }

  onSubmit(forApproved: boolean = false): void {
    if (this.jobForm.valid) {
      const skillsValue = this.jobForm.value.skills;
      const skills: string = Array.isArray(skillsValue)
        ? skillsValue.map((obj: { value: string }) => obj.value).join(', ')
        : skillsValue; // If it's a string, just use it as is

      let jobDetails: JobDetails = this.jobForm.value;
      jobDetails.skills = skills;
      jobDetails.base_salary_currency = jobDetails.base_salary_currency.toString();
      if(this.jobId > 0){
        if(forApproved){
          jobDetails.status = 1;
        }
        this.jobService.updateJobDetails(jobDetails).subscribe((response) => {
          if(response) {
            this.showToast('submitted successfully!', 'Success', 'success');
            this.ngOnInit();
          }
        });
        if(this.user._type == 1){
          this.sendEmailFromCompanyToAdminUpdate();
        }
      }else{
        this.jobService.saveJobDetails(jobDetails).subscribe((response) => {
          if(response) {
            this.showToast('submitted successfully!', 'Success', 'success');
            this.router.navigate(['/main/manage-jobs/' + response.id]);
          }
        });
        if(this.user._type == 1){
          this.sendEmailFromCompanyToAdmin();
        }
      }
    }
  }


   // Helper method to check if a form control is invalid and touched
   isInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control !== null && control !== undefined && control.invalid ;
  }


  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }

  sendEmail(){
    const emailData: EmailData = {
      to: this.jobForm.controls['postedby'].value,
      from: this.user._email,
      subject: 'Comments from Admin',
      body:  `

          <p>Hello,</p>
          <p>I hope this message finds you well.</p>
          <p>${this.jobForm.controls['comments'].value}</p>
          <p>If you have any questions or need further clarification, feel free to reach out.</p>
          <p>Best regards</p>

      `
    }
    this.authService.sendEmail(emailData).subscribe((response) => {
      if(response) this.showToast('Email Sent successfully!', 'Success', 'success');
    })
  }

  sendEmailFromCompanyToAdmin(){
    var body = 'A Company submitted a new post for Job Id number ' + this.jobId +'with a title of' + this.jobForm?.controls['title'].value;
    const emailData: EmailData = {
      to: "bayaningofw@bayaningofw.com",
      from: this.user._email,
      subject: 'new job post submitted',
      body:
      `
          <p>Hello,</p>
          <p>I hope this message finds you well.</p>
          <p>${body}</p>
          <p>If you have any questions or need further clarification, feel free to reach out.</p>
          <p>Best regards</p>
   `
    }
    this.authService.sendEmail(emailData).subscribe((response) => {
      if(response) this.showToast('Email Sent successfully!', 'Success', 'success');
    })
  }

  sendEmailFromCompanyToAdminUpdate(){

    var body = 'A Company submitted a changes for Job Id number ' + this.jobId +'with a title of' + this.jobForm.controls['title'].value;
    const emailData: EmailData = {
      to: "bayaningofw@bayaningofw.com",
      from: this.user._email,
      subject: 'post Changes submitted by a company',
      body:
      `
          <p>Hello,</p>
          <p>I hope this message finds you well.</p>
          <p>${body}</p>
          <p>If you have any questions or need further clarification, feel free to reach out.</p>
          <p>Best regards</p>
      `
    }
    this.authService.sendEmail(emailData).subscribe((response) => {
      if(response) this.showToast('Email Sent successfully!', 'Success', 'success');
    })
  }
}
