import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
];

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [...materialModules],
  exports: [...materialModules],
})
export class SharedModule {}
