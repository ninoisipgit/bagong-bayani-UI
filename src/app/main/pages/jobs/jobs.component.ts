import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;

  constructor(private jobService: JobService, private router:Router, private authService: AuthService){
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    this.fetchData();
}

fetchData(){
  if(this.isAuthenticated){
    this.jobService.getAllJobList(this.user._id).subscribe((response) => {
      this.jobListings = response;
      this.selectedJob = this.jobListings[0];
    });
  }
}

  displayJobDetails(job: any){
    this.selectedJob = job;
  }

  applyForJob(){

  }
}
