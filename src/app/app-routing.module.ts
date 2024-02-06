import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeComponent } from './features/recipe/recipe.component';
import { ComparableProductsComponent } from './features/search-products/comparable-products.component';
import { MealPlanDayComponent } from './features/meal-plan-day/meal-plan-day.component';
import { ProductInformationComponent } from './features/product-information/product-information.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { FoodItemComponent } from './features/foodItem/foodItem.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'home', component: HomeComponent },
  {
    path: 'recipes/:id',
    component: RecipeComponent,
    data: { breadcrumb: 'recipes' },
  },
  {
    path: 'comparable-products',
    component: ComparableProductsComponent,
    data: { breadcrumb: { alias: 'comparable-products' } },
  },
  {
    path: 'meal-plan-day',
    component: MealPlanDayComponent,
    data: { breadcrumb: 'meal-plan-day' },
  },
  {
    path: 'product-information',
    component: ProductInformationComponent,
    data: { breadcrumb: { alias: 'product-information' } },
  },
  {
    path: 'error-dialog',
    component: ErrorDialogComponent,
    data: { breadcrumb: { alias: 'error-dialog' } },
  },
  {
    path: 'foodItems',
    component: FoodItemComponent,
    data: { breadcrumb: { alias: 'foodItem' } },
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
