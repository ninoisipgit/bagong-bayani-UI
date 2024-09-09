import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent  implements OnInit{

  jobListings!:any[];
  selectedJob!:any;
  jobApplicants!:any[];

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  constructor(private jobService: JobService,
     private router:Router,
     private authService: AuthService,
     private toastrService: NbToastrService,
    ){
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.getAllApplicants();
}

fetchData(){
  if(this.isAuthenticated){
    this.jobService.getAllJobList(this.user._id)
    .subscribe((response) => {
      this.jobListings = response;
      this.selectedJob = this.jobListings[0];

    });
  }
}

  displayJobDetails(job: any){
    this.selectedJob = job;
  }

  applyForJob(){
    if(this.selectedJob){
      const  application = {
        jobID : this.selectedJob.id,
        appliedUserID : this.user._id,
        status : "applied"
      }
      this.jobService.applyForJob(application).subscribe((res: any) => {
        if(res){
          this.showToast('Application submitted successfully!', 'Success', 'success');
          this.getAllApplicants();
        }
      });
    }
  }

  getAllApplicants(){
    this.jobService.getJobApplicants().subscribe((res: any) => {
      if(res){
        this.jobApplicants = res;
      }
    })
  }

  getStatus(job: any): string {
    if (this.jobApplicants) {
      const applicant = this.jobApplicants.find((x: any) => x.jobID === job.id && x.appliedUserID === this.user?._id);
      if (applicant) {
        return "Applied";
      }
    }
    return "Apply";
  }


  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }
}
