import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
  errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DATA in EROR DIALOG', data.message);
    this.errorMessage = data.message;
  }
}
