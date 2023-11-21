import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipe: RecipeModel | undefined;

  constructor(private recipeService: recipeService) {}

  ngOnInit(): void {
    console.log('in Home compoentn');
    this.getRecipe();
  }

  getRecipe(): void {
    const recipeId = 732429; // Replace with the desired recipe ID
    this.recipeService.getRecipeInformation(recipeId).subscribe(
      (data: RecipeModel) => {
        this.recipe = data;
        console.log('Recipe fetched successfully:', this.recipe);
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }
}
