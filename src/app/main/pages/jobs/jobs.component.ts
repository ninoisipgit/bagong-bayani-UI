import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbDialogService,
  NbSidebarService,
  NbToastrService,
} from '@nebular/theme';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { JobService } from 'src/app/shared/services/job.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { ModalJobDetailsComponent } from './modal-job-details/modal-job-details.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobListings!: any[];
  selectedJob!: any;
  jobApplicants!: any[];

  private userSub: Subscription;
  user!: UserToken;
  isAuthenticated = false;
  userDetails: any;

  constructor(
    private jobService: JobService,
    private router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private userDetailsService: UserDetailsService,
    private dialogService: NbDialogService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {
    this.userDetailsService
      .getPersonalDetailsByUserId(this.user._id)
      .subscribe((response: any) => {
        this.userDetails = response;
      });
    this.fetchData();
    this.getAllApplicants();
  }

  fetchData() {
    if (this.isAuthenticated) {
      this.jobService
        .getAllJobListbyUserId(this.user._id)
        .subscribe((response) => {
          this.jobListings = response.filter((job: any) => job.status === 1);
          this.selectedJob = this.jobListings[0];
        });
    }
  }

  SearchJob(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLTextAreaElement;
      if (
        inputElement &&
        inputElement.value != null &&
        inputElement.value.trim() !== ''
      ) {
        if (this.isAuthenticated) {
          this.jobService
            .SearchAllJobList(inputElement.value)
            .subscribe((response) => {
              this.jobListings = response.filter(
                (job: any) => job.status === 1
              );
              this.selectedJob = this.jobListings[0];
            });
        }
      } else {
        this.fetchData();
      }
    }
  }

  toggleOffcanvas(job: any) {
    this.dialogService
      .open(ModalJobDetailsComponent, {
        hasBackdrop: true,
        hasScroll: true,
        autoFocus: true,
        context: {
          job: job,
          status: this.getStatus(job),
        },
      })
      .onClose.subscribe((isApply) => {
        if (isApply) {
          this.applyForJob();
        }
      });
  }

  displayJobDetails(job: any, type: string) {
    if (type === 'small') {
      this.toggleOffcanvas(job);
    } else {
      this.selectedJob = job;
    }
  }

  applyForJob() {
    if (this.selectedJob) {
      const application = {
        jobID: this.selectedJob.id,
        appliedUserID: this.user._id,
        status: 'applied',
      };
      this.jobService.applyForJob(application).subscribe((res: any) => {
        if (res) {
          this.showToast(
            'Application submitted successfully!',
            'Success',
            'success'
          );
          this.getAllApplicants();
        }
      });
    }
  }

  getAllApplicants() {
    this.jobService.getJobApplicants().subscribe((res: any) => {
      if (res) {
        this.jobApplicants = res;
      }
    });
  }

  getStatus(job: any): string {
    if (this.jobApplicants) {
      const applicant = this.jobApplicants.find(
        (x: any) => x.jobID === job.id && x.appliedUserID === this.user?._id
      );
      if (applicant) {
        return 'Applied';
      }
    }
    return 'Apply';
  }

  showToast(message: string, title: string, status: string) {
    this.toastrService.show('Form submitted successfully!', title, { status });
  }
}
