import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddReferenceComponent } from './add-reference/add-reference.component';
import { UserToken } from 'src/app/auth/models/userToken';
import { Subscription } from 'rxjs';
import { Reference } from 'src/app/shared/models/reference';
import { AuthService } from 'src/app/auth/auth.service';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
})
export class ReferencesComponent {
  user!: UserToken;
  isAuthenticated = false;
  personID: number = 0;
  jobID: number = 0;
  readonly: boolean = false;
  private userSub: Subscription;
  references: Reference[] = [];

  constructor(
    private dialogService: NbDialogService,
    private authService: AuthService,
    private resumeBuilderService: ResumeBuilderService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        console.log(user);
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
    this.getReferences();
  }

  getReferences(): void {
    this.resumeBuilderService.getReferences(this.personID).subscribe({
      next: (data: any) => {
        this.references = data.data;
      },
      error: (err) => {
        console.error('Error fetching education data', err);
      },
    });
  }

  deleteReference(reference: any) {
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
          this.resumeBuilderService.deleteReference(reference.id).subscribe({
            next: () => {
              this.toastrService.success(
                'Reference record removed successfully!',
                'Success'
              );
              this.getReferences(); // Refresh the list after deletion
            },
            error: (err) => {
              console.error('Error deleting Reference data', err);
            },
          });
        }
      });
  }
  editReference(reference: any) {
    this.dialogService
      .open(AddReferenceComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Character Reference',
          type: 'Update',
          data: reference,
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (!eventData) {
          return;
        }
        const index = this.references.findIndex(
          (ref) => ref.id === eventData.id
        ); // assuming each education has a unique `id`

        if (index === -1) {
          // If it doesn't exist, push it to the array
          this.references.push(eventData);
        } else {
          // If it exists, update the element at the found index
          this.references[index] = eventData;
        }
      });
  }

  addReference() {
    this.dialogService
      .open(AddReferenceComponent, {
        closeOnBackdropClick: false,
        context: {
          title: 'Character Reference',
          type: 'Add',
          data: '',
          user: this.user,
        },
      })
      .onClose.subscribe((eventData) => {
        if (eventData) {
          this.references.push(eventData);
        }
      });
  }
}
