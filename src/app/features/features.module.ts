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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatChipsModule } from '@angular/material/chips';
import { BurgerComponent } from './burger/burger.component';
// import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    RecipeComponent,
    MealPlanDayComponent,
    ComparableProductsComponent,
    ProductInformationComponent,
    BurgerComponent,
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
  ],
  exports: [],
})
export class FeatureModule {}
