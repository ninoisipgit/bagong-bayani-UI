import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddEducationComponent } from './add-education/add-education.component';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';
import { UserToken } from 'src/app/auth/models/userToken';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EducationBackground } from 'src/app/shared/models/education-background';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  user!: UserToken;
  isAuthenticated = false;
  personID: number = 0;
  jobID: number = 0;
  readonly: boolean = false;
  private userSub: Subscription;
  educations: EducationBackground[] = [];

  constructor(
    private dialogService: NbDialogService,
    private authService: AuthService,
    private resumeBuilderService: ResumeBuilderService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.personID = user?._id;
        this.isAuthenticated = !!user;
        if (this.user._type == 3) {
          this.readonly = true;
          this.route.paramMap.subscribe((params) => {
            this.personID = Number(params.get('userId'));
            this.jobID = Number(params.get('jobID'));
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.getEducations();
  }

  getEducations(): void {
    this.resumeBuilderService.getEducations(this.personID).subscribe({
      next: (data: any) => {
        this.educations = data.data;
      },
      error: (err) => {
        console.error('Error fetching education data', err);
      },
    });
  }

  deleteEducation(education: any): void {
    console.log(education);
    this.dialogService
      .open(ConfirmDialogComponent, {
        closeOnBackdropClick: false,
        context: {
          data: {
            title: 'Confirmation',
            text: 'Are you sure you want to Proceed?',
          },
        },
      })
      .onClose.subscribe((bool: boolean) => {
        if (bool) {
          this.resumeBuilderService.deleteEducation(education.id).subscribe({
            next: () => {
              this.toastrService.success(
                'Education record removed successfully!',
                'Success'
              );
              this.getEducations(); // Refresh the list after deletion
            },
            error: (err) => {
              console.error('Error deleting education data', err);
            },
          });
        }
      });
  }
  editEducation(education: any) {
    this.dialogService
      .open(AddEducationComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Work Experience',
          type: 'Update',
          data: education,
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (!eventData) {
          return;
        }
        const index = this.educations.findIndex(
          (education) => education.id === eventData.id
        ); // assuming each education has a unique `id`

        if (index === -1) {
          // If it doesn't exist, push it to the array
          this.educations.push(eventData);
        } else {
          // If it exists, update the element at the found index
          this.educations[index] = eventData;
        }
      });
  }
  addEducation() {
    this.dialogService
      .open(AddEducationComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Work Experience',
          type: 'Add',
          data: '',
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (eventData) {
          this.educations.push(eventData);
        }
      });
  }
}
