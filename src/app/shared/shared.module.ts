import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselComponent } from './carousel/carousel.component';
import { JokesDialogComponent } from './jokes-dialog/jokes-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const materialModules = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
];

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CarouselComponent,
    JokesDialogComponent,
    FooterComponent,
  ],
  imports: [...materialModules, CarouselModule, CommonModule, BrowserModule],
  exports: [
    ...materialModules,
    CarouselComponent,
    JokesDialogComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
