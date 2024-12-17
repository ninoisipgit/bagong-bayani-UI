import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddCertificationsComponent } from './add-certifications/add-certifications.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from 'src/app/auth/models/userToken';
import { Subscription } from 'rxjs';
import { Certification } from 'src/app/shared/models/certification';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent {
  user!: UserToken;
  isAuthenticated = false;
  personID: number = 0;
  jobID: number = 0;
  readonly: boolean = false;
  private userSub: Subscription;
  certifications: Certification[] = [];
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
    this.getCertifications();
  }
  getCertifications(): void {
    this.resumeBuilderService.getCertifications(this.personID).subscribe({
      next: (data: any) => {
        this.certifications = data.data;
      },
      error: (err) => {
        console.error('Error fetching education data', err);
      },
    });
  }

  editEducation(certificate: any) {
    this.dialogService
      .open(AddCertificationsComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Certificate',
          type: 'Update',
          data: certificate,
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (!eventData) {
          return;
        }
        const index = this.certifications.findIndex(
          (certificate) => certificate.id === eventData.id
        ); // assuming each education has a unique `id`

        if (index === -1) {
          // If it doesn't exist, push it to the array
          this.certifications.push(eventData);
        } else {
          // If it exists, update the element at the found index
          this.certifications[index] = eventData;
        }
      });
  }

  deleteCertificate(certificate: any): void {
    console.log(certificate);
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
          this.resumeBuilderService
            .deleteCertification(certificate.id)
            .subscribe({
              next: () => {
                this.toastrService.success(
                  'certification record removed successfully!',
                  'Success'
                );
                this.getCertifications(); // Refresh the list after deletion
              },
              error: (err) => {
                console.error('Error deleting certification data', err);
              },
            });
        }
      });
  }
  addCertification() {
    this.dialogService
      .open(AddCertificationsComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Certificate',
          type: 'Add',
          data: '',
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (eventData) {
          this.certifications.push(eventData);
        }
      });
  }
}
