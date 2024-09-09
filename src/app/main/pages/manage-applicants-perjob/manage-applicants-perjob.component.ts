import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EmployerDetails } from 'src/app/shared/models/employer-details';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-manage-applicants-perjob',
  templateUrl: './manage-applicants-perjob.component.html',
  styleUrls: ['./manage-applicants-perjob.component.scss']
})
export class ManageApplicantsPerjobComponent implements OnInit {
  jobId:number = 0;
  jobDetails:any;

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  employerDetails!: EmployerDetails

  jobApplicants!: any[]


  constructor(
    private route: ActivatedRoute,
    private authService : AuthService,
    private jobService:JobService,
    private router: Router,
    private toastrService: NbToastrService,
    private userDetailsService: UserDetailsService
  ) {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;

    });
    this.route.paramMap.subscribe(params => {
      this.jobId = Number(params.get('jobId'));
      console.log(this.jobId);
    });

    this.userDetailsService.getEmployerDetails(this.user._id).subscribe(
      (details: EmployerDetails) => {
        this.employerDetails = details;
      },
      (error) => {
        console.error('Error fetching company details', error);
      }
    );
  }
  ngOnInit(): void {
    this.getApplicantsList();
    if(this.jobId > 0){
      this.jobService.getJobDetails(this.jobId).subscribe((response) => {
        this.jobDetails = response;
      });
    }
  }

  getApplicantsList(){
    this.jobService.getJobApplicants().subscribe((res: any) => {
      this.jobApplicants = res.filter((x: any) => x.jobID === this.jobId);
    })
  }

  onStatusChange(applicant: any, event: string): void {
    if(applicant){
      const  application = {
        id : applicant.id,
        jobID : applicant.jobID,
        appliedUserID : applicant.appliedUserID,
        status : event
      }
      this.jobService.applyForJob(application).subscribe((res: any) => {
        if(res){
          this.showToast('Application submitted successfully!', 'Success', 'success');
        }
      });
    }
  }
  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }

}
