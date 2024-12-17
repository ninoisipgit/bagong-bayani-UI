import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';

@Component({
  selector: 'app-add-certifications',
  templateUrl: './add-certifications.component.html',
  styleUrls: ['./add-certifications.component.scss'],
})
export class AddCertificationsComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() data!: any;
  @Input() user!: any;
  certificationForm!: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<AddCertificationsComponent>,
    private fb: FormBuilder,
    private resumeBuilderComponent: ResumeBuilderService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.certificationForm = this.fb.group({
        id: [this.data.id],
        personID: [this.user?._id, Validators.required],
        certification_award: [
          this.data.certification_award,
          Validators.required,
        ],
        organization: [this.data.organization, Validators.required],
        startDate: [this.data.startDate, Validators.required],
        // endDate: ['', Validators.required],
      });
    } else {
      this.certificationForm = this.fb.group({
        id: [null],
        personID: [this.user?._id, Validators.required],
        certification_award: ['', Validators.required],
        organization: ['', Validators.required],
        startDate: ['', Validators.required],
        // endDate: ['', Validators.required],
      });
    }
  }

  onCloseModal() {
    this.dialogRef.close();
  }

  submitEvent(): void {
    console.log(this.certificationForm);
    if (this.certificationForm.valid) {
      if (!this.certificationForm.value.id) {
        this.resumeBuilderComponent
          .addCertification(this.certificationForm.value)
          .subscribe({
            next: () => {
              this.toastrService.success(
                'certificate record updated successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating certificate record', err);
            },
          });
      } else {
        this.resumeBuilderComponent
          .updateCertification(
            this.certificationForm.value.id,
            this.certificationForm.value
          )
          .subscribe({
            next: () => {
              this.toastrService.success(
                'certificate record Added successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating certificate record', err);
            },
          });
      }

      this.dialogRef.close(this.certificationForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
