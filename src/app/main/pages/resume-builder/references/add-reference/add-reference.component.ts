import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ResumeBuilderService } from 'src/app/shared/services/resume-builder.service';

@Component({
  selector: 'app-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['./add-reference.component.scss'],
})
export class AddReferenceComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() data!: any;
  @Input() user!: any;

  referenceForm!: FormGroup;
  constructor(
    protected dialogRef: NbDialogRef<AddReferenceComponent>,
    private fb: FormBuilder,
    private resumeBuilderComponent: ResumeBuilderService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.referenceForm = this.fb.group({
        id: [this.data.id],
        personID: [this.user?._id, Validators.required],
        Name: [this.data.Name],
        position: [this.data.position, Validators.required],
        organization: [this.data.organization, Validators.required],
        phone_number: [this.data.phone_number, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
      });
    } else {
      this.referenceForm = this.fb.group({
        id: [null],
        personID: [this.user?._id, Validators.required],
        Name: [''],
        position: ['', Validators.required],
        organization: ['', Validators.required],
        phone_number: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  onCloseModal() {
    this.dialogRef.close();
  }

  submitEvent(): void {
    if (this.referenceForm.valid) {
      console.log(this.referenceForm.value);

      if (!this.referenceForm.value.id) {
        this.resumeBuilderComponent
          .createReference(this.referenceForm.value)
          .subscribe({
            next: () => {
              this.toastrService.success(
                'reference record updated successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating reference record', err);
            },
          });
      } else {
        this.resumeBuilderComponent
          .updateReference(
            this.referenceForm.value.id,
            this.referenceForm.value
          )
          .subscribe({
            next: () => {
              this.toastrService.success(
                'reference record Added successfully!',
                'Success'
              );
            },
            error: (err) => {
              console.error('Error creating reference record', err);
            },
          });
      }

      this.dialogRef.close(this.referenceForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
