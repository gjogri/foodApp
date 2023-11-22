import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, RecipeComponent],
  imports: [MatGridListModule, SharedModule, CommonModule, MatCardModule],
  exports: [],
})
export class FeatureModule {}
