import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(
    private route: ActivatedRoute,
    private authService : AuthService,
    private jobService:JobService,
    private router: Router,
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
    if(this.jobId > 0){
      this.jobService.getJobDetails(this.jobId).subscribe((response) => {
        this.jobDetails = response;
      });
    }
  }

}
