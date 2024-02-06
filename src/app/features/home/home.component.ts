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
  favoriteRecipes: RecipeModel[] = [];
  weekPlanMeal: any | undefined;
  todayDate: string = '';
  numberOfRecipe = 3;
  favorite = false;
  constructor(private recipeService: recipeService, private router: Router) {}

  ngOnInit(): void {
    this.getRandomRecipes(this.numberOfRecipe);
    this.todayDate = new Date().toISOString().split('T')[0];
    this.getLatestFavorites();
  }

  getRandomRecipes(numberOfRecipe: number) {
    this.recipeService.getRandomRecipes(numberOfRecipe).subscribe(
      (recipes: RecipeModel[]) => {
        console.log('recieps', recipes);
        this.randomRecipes = recipes;
      },
      (error) => {
        console.error('Error fetching random recipes:', error);
      }
    );
  }

  getRecipeId(id: number) {
    this.router.navigate(['/recipes', id]);
  }

  sanitizeInstructions(instruction: string): string {
    return instruction.replace(/<\/?ol>|<\/?li>/g, '');
  }

  getRecipe(id: number) {
    this.recipeService.getRecipeById(id).subscribe(
      (recipe: RecipeModel) => {
        this.favoriteRecipes.push(recipe);
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }

  getLatestFavorites() {
    const favoritesData = localStorage.getItem('favorites');

    let favoritesList: number[] = [];

    if (favoritesData) {
      this.favorite = true;
      favoritesList = JSON.parse(favoritesData);
      console.log('favoritesList', favoritesList.length);
      favoritesList.forEach((id: number) => {
        console.log('favoritesList1', favoritesList.length);
        this.getRecipe(id);
      });
    }
  }
}
