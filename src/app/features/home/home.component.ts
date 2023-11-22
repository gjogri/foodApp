import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipe: RecipeModel | undefined;
  randomRecipes: RecipeModel[] = [];
  constructor(private recipeService: recipeService, private router: Router) {}

  ngOnInit(): void {
    this.getRecipe();
    this.getRandomRecipes(10);
  }

  getRecipe(): void {
    const recipeId = 732429;
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

  getRandomRecipes(numberOfRecipe: number) {
    this.recipeService.getRandomRecipes(numberOfRecipe).subscribe(
      (recipes: RecipeModel[]) => {
        this.randomRecipes = recipes;
        console.log('RANDOM RECIPES:', this.randomRecipes[0].id);
        console.log('RANDOM RECIPES:', this.randomRecipes.length);
      },
      (error) => {
        console.error('Error fetching random recipes:', error);
      }
    );
  }

  getRecipeId(id: number) {
    this.router.navigate(['/recipes', id]);
    console.log('ID:', id);
  }
}
