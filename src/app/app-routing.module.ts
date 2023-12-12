import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeComponent } from './features/recipe/recipe.component';
import { ComparableProductsComponent } from './features/comparable-products/comparable-products.component';
import { MealPlanDayComponent } from './features/meal-plan-day/meal-plan-day.component';
import { ProductInformationComponent } from './features/product-information/product-information.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { FoodItemComponent } from './features/foodItem/foodItem.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'comparable-products', component: ComparableProductsComponent },
  { path: 'meal-plan-day', component: MealPlanDayComponent },
  { path: 'product-information', component: ProductInformationComponent },
  { path: 'error-dialog', component: ErrorDialogComponent },
  { path: 'foodItems', component: FoodItemComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
