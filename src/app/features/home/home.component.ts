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
  weekPlanMeal: any | undefined;
  todayDate: string = '';
  constructor(private recipeService: recipeService, private router: Router) {}

  ngOnInit(): void {
    this.getRandomRecipes(10);
    this.getWeekPlanDay();
    this.todayDate = new Date().toISOString().split('T')[0];
    console.log(this.todayDate);
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
    console.log('ID:', id);
  }

  getWeekPlanDay() {
    this.recipeService.getWeekPlanMeal().subscribe(
      (data) => {
        console.log('Fetched week plan:', data);
      },
      (error) => {
        console.error('Error fetching week plan:', error);
      }
    );
  }
}
