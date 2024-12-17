import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() data!: { title: string; text: string };
  constructor(protected dialogRef: NbDialogRef<ConfirmDialogComponent>) {}

  confirmation(bool: boolean) {
    this.dialogRef.close(bool);
  }
}
