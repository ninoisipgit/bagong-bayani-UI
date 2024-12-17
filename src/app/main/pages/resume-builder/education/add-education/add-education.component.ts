import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss'],
})
export class AddEducationComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() data!: any;
  @Input() user!: any;

  educationForm!: FormGroup;
  constructor(
    protected dialogRef: NbDialogRef<AddEducationComponent>,
    private fb: FormBuilder,
    private resumeBuilderComponent: ResumeBuilderService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.educationForm = this.fb.group({
        id: [this.data.id],
        personID: [this.user?._id, Validators.required],
        degree: [this.data.degree, Validators.required],
        institution: [this.data.institution, Validators.required],
        startDate: [this.data.startDate, Validators.required],
        endDate: [this.data.endDate, Validators.required],
      });
    } else {
      this.educationForm = this.fb.group({
        id: [null],
        personID: [this.user?._id, Validators.required],
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    }
  }

  onCloseModal() {
    this.dialogRef.close();
  }

  submitEvent(): void {
    if (this.educationForm.valid) {
      console.log(this.educationForm.value);

      if (!this.educationForm.value.id) {
        this.resumeBuilderComponent
          .createEducation(this.educationForm.value)
          .subscribe({
            next: () => {
              this.toastrService.success(
                'education record updated successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating education record', err);
            },
          });
      } else {
        this.resumeBuilderComponent
          .updateEducation(
            this.educationForm.value.id,
            this.educationForm.value
          )
          .subscribe({
            next: () => {
              this.toastrService.success(
                'education record Added successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating education record', err);
            },
          });
      }

      this.dialogRef.close(this.educationForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
