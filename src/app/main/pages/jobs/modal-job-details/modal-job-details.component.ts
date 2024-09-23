import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-modal-job-details',
  templateUrl: './modal-job-details.component.html',
  styleUrls: ['./modal-job-details.component.scss'],
})
export class ModalJobDetailsComponent {
  constructor(protected dialogRef: NbDialogRef<ModalJobDetailsComponent>) {}
  @Input() job!: any;
  @Input() status!: any;

  close(isApply: boolean) {
    this.dialogRef.close(isApply);
  }
}
