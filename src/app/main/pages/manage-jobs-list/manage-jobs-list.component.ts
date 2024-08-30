import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-manage-jobs-list',
  templateUrl: './manage-jobs-list.component.html',
  styleUrls: ['./manage-jobs-list.component.scss']
})
export class ManageJobsListComponent implements OnInit{
  jobListings!:any[];
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
      this.jobService.getJobDetailsListByUserId(this.user._id).subscribe((response) => {
        this.jobListings = response;
      });
    }
  }

  editJob(job: any) {
    this.router.navigate(['/main/manage-jobs/' + job.id]);
  }

  deleteJob(job: any) {
    this.jobService.deleteJob(job.id).subscribe((response) => {
      if(response){
        this.fetchData();
      }
    });
  }

}
