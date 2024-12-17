import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddWorkExperienceComponent } from './add-work-experience/add-work-experience.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { Subscription } from 'rxjs';
import { UserToken } from 'src/app/auth/models/userToken';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { UserProfile } from 'src/app/shared/models/user-profile';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent {
  user!: UserToken;
  isAuthenticated = false;
  personID: number = 0;
  jobID: number = 0;
  readonly: boolean = false;
  private userSub: Subscription;
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private userDetails: UserDetailsService,
    private locationService: LocationService
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

  employmentForm = this.fb.group({
    employmentDetails: this.fb.array([]), // FormArray to hold multiple employment details
  });
  // Helper function to get the employmentDetails FormArray
  get employmentDetails(): FormArray {
    return this.employmentForm.get('employmentDetails') as FormArray;
  }

  // Function to create a new FormGroup for a single employment record
  createEmploymentGroup(data: any): FormGroup {
    const parts = (data.monthlySalary || '').split('%');
    return this.fb.group({
      personId: data.personId || '',
      id: data.id || '',
      employerName: data.employerName || '',
      vessel: data.vessel || '',
      occupation: data.occupation || '',
      currency: parts[0] || '',
      monthlySalary: parts[1] || '',
      coe_attachment: data.coe_attachment || '',
      passport_attachment: data.passport_attachment || '',
      agencyName: data.agencyName || '',
      contractDuration: data.contractDuration || '',
      ofwType: data.ofwType || '',
      jobSite: data.jobSite || '',
      status: data.status || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
    });
  }
  ngOnInit() {
    this.getEmploymentDetails();
  }

  getEmploymentDetails() {
    this.userDetails
      .getEmploymentDetailsByUserId(this.personID)
      .subscribe((response) => {
        // Clear the existing FormArray
        this.employmentDetails.clear();

        // Loop through the response to add each item to the FormArray
        response.forEach((employment: any) => {
          this.employmentDetails.push(this.createEmploymentGroup(employment));
        });
      });
  }

  deleteEmployment(index: number) {
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
          const control = this.employmentDetails.at(index);
          const id = control.get('id')?.value;
          this.employmentDetails.removeAt(index);

          this.userDetails
            .deleteEmploymentDetails({ id: id })
            .subscribe((response: any) => {
              // Success block
              if (response) {
                this.toastrService.success(
                  'Employment record removed successfully!',
                  'Success'
                );
              }
            });
        }
      });
  }
  editEmployment(index: number) {
    const selectedRecord = this.employmentDetails.at(index).value;
    this.dialogService
      .open(AddWorkExperienceComponent, {
        closeOnBackdropClick: false,
        context: {
          // title: 'Edit Work Experience',
          type: 'Update',
          record: selectedRecord, // pass the data to the dialog
          user: this.user,
        },
      })
      .onClose.subscribe((updatedData) => {
        if (updatedData) {
          // Update the specific FormArray entry with new data
          this.employmentDetails.at(index).patchValue(updatedData);
          this.toastrService.success(
            'Employment record updated successfully!',
            'Success'
          );
        }
      });
  }
  addWorkExperience() {
    this.dialogService
      .open(AddWorkExperienceComponent, {
        closeOnBackdropClick: false,
        context: {
          // title: 'Add Work Experience',
          type: 'Add',
          user: this.user,
        },
      })
      .onClose.subscribe((newRecord) => {
        if (newRecord) {
          // Create a new FormGroup for the added record and append to FormArray
          this.employmentDetails.push(this.createEmploymentGroup(newRecord));
          this.toastrService.success(
            'New work experience added successfully!',
            'Success'
          );
        }
      });
  }
  get employmentDetailGroups(): FormGroup[] {
    return this.employmentDetails.controls as FormGroup[];
  }
}
