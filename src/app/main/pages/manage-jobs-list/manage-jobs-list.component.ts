import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { EmployerDetails } from 'src/app/shared/models/employer-details';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

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
  employerDetails: EmployerDetails | undefined;
  searchTerm: string = ''; // Bound to the search input
  filteredJobListings: any[] = []; // List to display filtered jobs
  constructor(
    private jobService: JobService,
    private router:Router,
    private authService: AuthService,
    private userDetailsService:UserDetailsService){
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }
  ngOnInit(): void {
    this.userDetailsService.getEmployerDetails(this.user._id).subscribe(
      (details: EmployerDetails) => {
        this.employerDetails = details;
      },
      (error) => {
        console.error('Error fetching company details', error);
      }
    );
      this.fetchData();
  }

    // Method to filter jobs based on search term
    filterJobs() {
      const term = this.searchTerm.toLowerCase();
      this.filteredJobListings = this.jobListings.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.hiring_organization_name.toLowerCase().includes(term) ||
        job.employment_type.toLowerCase().includes(term)
      );
    }

  fetchData(){
    if(this.isAuthenticated){
      if(this.user._type == 3){
        this.jobService.getAllJobListbyUserId(0).subscribe((response) => {
          this.jobListings = response;
          this.filteredJobListings = response;
        });
      }else{
        this.jobService.getJobPostsByUser(this.user._id).subscribe((response) => {
          this.jobListings = response;
          this.filteredJobListings = response;
        });
      }

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
