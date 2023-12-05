import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MealPlanDayComponent } from './meal-plan-day/meal-plan-day.component';
import { ComparableProductsComponent } from './comparable-products/comparable-products.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    HomeComponent,
    RecipeComponent,
    MealPlanDayComponent,
    ComparableProductsComponent,
    ProductInformationComponent,
  ],
  imports: [
    MatGridListModule,
    SharedModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    MatInputModule,

    MatNativeDateModule,
  ],
  exports: [],
})
export class FeatureModule {}
