import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserToken } from 'src/app/auth/models/userToken';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-add-work-experience',
  templateUrl: './add-work-experience.component.html',
  styleUrls: ['./add-work-experience.component.scss'],
})
export class AddWorkExperienceComponent {
  @Input() record!: any;
  @Input() user!: any;
  @Input() type!: any;
  employmentForm!: FormGroup;
  constructor(
    protected dialogRef: NbDialogRef<AddWorkExperienceComponent>,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    private userDetails: UserDetailsService
  ) {
    this.employmentForm = this.fb.group({
      // Employment Details
      id: [0],
      employerName: ['', Validators.required],
      personID: ['', Validators.required],
      vessel: ['', Validators.required],
      occupation: ['', Validators.required],
      monthlySalary: ['', Validators.required],
      agencyName: [''],
      contractDuration: ['', Validators.required],
      ofwType: ['', Validators.required],
      jobSite: ['', Validators.required],
      currency: ['', Validators.required],
      // employeraddress: ['', Validators.required],
      // employercontactno: [''],
      // salarycurrency: ['']
      coe_attachment: ['', Validators.required], //status,
      passport_attachment: [''], //year contract finished,
      startDate: ['', Validators.required], //year contract finished,
      endDate: ['', Validators.required], //year contract finished,
    });
  }
  eventData = { title: '', description: '' };
  salaryRanges: string[] = [];

  ngOnInit(): void {
    this.generateSalaryRanges();
    if (this.record) {
      this.employmentForm.patchValue({
        personID: this.user._id,
        id: this.record.id,
        employerName: this.record.employerName,
        vessel: this.record.vessel,
        occupation: this.record.occupation,
        currency: this.record.currency,
        monthlySalary: this.record.monthlySalary,
        coe_attachment: this.record.coe_attachment,
        passport_attachment: this.record.passport_attachment,
        agencyName: this.record.agencyName,
        contractDuration: this.record.contractDuration,
        ofwType: this.record.ofwType,
        jobSite: this.record.jobSite,
        status: this.record.status,
        startDate: this.record.startDate,
        endDate: this.record.endDate,
      });
    } else {
      this.employmentForm.patchValue({
        personID: this.user._id,
      });
    }
  }
  onCloseModal() {
    this.dialogRef.close();
  }

  submitEvent() {
    // Your logic to submit or handle the event
    this.dialogRef.close(this.record); // Close the modal and send data back to parent
  }

  generateSalaryRanges() {
    const step = 10000;
    const max = 100000;
    for (let i = 10000; i < max; i += step) {
      const range = `${i.toLocaleString()} - ${(i + step).toLocaleString()}`;
      this.salaryRanges.push(range);
    }
  }
  isSubmitted = false;
  isInvalid(controlName: string, form: FormGroup): string {
    return !!form.get(controlName)?.invalid ? 'is-invalid' : '';
  }
  showToast(message: string, title: string, status: string) {
    this.toastrService.show('', title, { status });
  }

  onSubmitEmploymentDetails(): void {
    this.isSubmitted = true;
    // Check if the form is valid
    if (this.employmentForm.invalid) {
      this.showToast('', 'Complete Required fields', 'info');
      return; // Stop execution if the form is invalid
    }
    const formsValues = this.employmentForm.value;
    const value: any = {
      personID: this.user._id,
      id: formsValues.id,
      employerName: formsValues.employerName,
      vessel: formsValues.vessel,
      occupation: formsValues.occupation,
      monthlySalary: formsValues.currency + '%' + formsValues.monthlySalary,
      agencyName: formsValues.agencyName,
      contractDuration: formsValues.contractDuration,
      ofwType: formsValues.ofwType,
      jobSite: formsValues.jobSite,
      status: formsValues.status,
      coe_attachment: formsValues.coe_attachment,
      passport_attachment: formsValues.passport_attachment,
      startDate: formsValues.startDate,
      endDate: formsValues.endDate,
    };
    try {
      if (this.user) {
        if (value.id) {
          this.userDetails
            .updateEmploymentDetails(value)
            .subscribe((response: any) => {
              // Success block
              if (response) {
                this.showToast('Submitted successfully!', 'Success', 'success');
                console.log('Success Response:', response);
              }
            });
        } else {
          this.userDetails
            .saveEmploymentDetails(value)
            .subscribe((response) => {
              if (response) {
                this.showToast('submitted successfully!', 'Success', 'success');
                console.log(response);
              }
            });
        }
      }
      const str = value.monthlySalary;
      const parts = str.split('%');
      value.monthlySalary = parts[1];
      value.currency = parts[0];
      this.dialogRef.close(value);
      this.isSubmitted = false;
    } catch (error) {
      this.showToast('submitted successfully!', 'Error', 'error');
    }
  }
}
