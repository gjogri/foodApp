import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  favorite: boolean = false;

  constructor(
    private recipeService: recipeService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getRandomRecipes(this.numberOfRecipe);
    this.todayDate = new Date().toISOString().split('T')[0];
    this.getLatestFavorites();
  }

  getRandomRecipes(numberOfRecipe: number) {
    this.recipeService.getRandomRecipes(numberOfRecipe).subscribe(
      (recipes: RecipeModel[]) => {
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
    let favoritesList: number[] = [];
    const favoritesData = localStorage.getItem('favorites');
    if (favoritesData != null) {
      favoritesList = JSON.parse(favoritesData);
    }
    if (favoritesList.length === 0) {
      console.log(favoritesData);
      this.favorite = false;
    } else {
      this.favorite = true;
      favoritesList.forEach((id: number) => {
        this.getRecipe(id);
      });
    }
  }
  getGridCols(): number {
    return this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 3;
  }
}
