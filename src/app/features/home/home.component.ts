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
  numberOfRecipe = 3;
  constructor(private recipeService: recipeService, private router: Router) {}

  ngOnInit(): void {
    this.getRandomRecipes(this.numberOfRecipe);
    this.todayDate = new Date().toISOString().split('T')[0];
  }

  getRandomRecipes(numberOfRecipe: number) {
    this.recipeService.getRandomRecipes(numberOfRecipe).subscribe(
      (recipes: RecipeModel[]) => {
        console.log('recieps', recipes);
        this.randomRecipes = recipes;
        console.log('this.randomRecipes:', this.randomRecipes);
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

  sanitizeInstructions(instruction: string): string {
    return instruction.replace(/<\/?ol>|<\/?li>/g, '');
  }
}
