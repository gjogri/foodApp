import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MealPlanDayComponent } from './meal-plan-day/meal-plan-day.component';
import { ComparableProductsComponent } from './search-products/comparable-products.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatChipsModule } from '@angular/material/chips';
import { FoodItemComponent } from './foodItem/foodItem.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    RecipeComponent,
    MealPlanDayComponent,
    ComparableProductsComponent,
    ProductInformationComponent,
    FoodItemComponent,
  ],
  imports: [
    MatGridListModule,
    SharedModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatNativeDateModule,
    NgxChartsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    BreadcrumbModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class FeatureModule {}
