import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle || this.dialogTitle;
      this.dialogContent = data.dialogContent || this.dialogContent;
    }
  }

  dialogTitle: string = 'Potwierdz czynnosc';
  dialogContent: string = 'Czy na pewno chcesz wykonac daną czynnosc?';

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
