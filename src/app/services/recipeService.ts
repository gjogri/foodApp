import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RecipeModel } from '../_models/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class recipeService {
  private apiUrl = 'https://api.spoonacular.com/recipes';
  private apiKey = '5aabdf9ebc6846b590b4cea0b46247fc';
  private hash = '94729fa27673c4d63cdda2c7ae92bacb19eed41e';
  constructor(private http: HttpClient) {}

  getRecipeInformation(recipeId: number): Observable<RecipeModel> {
    const url = `${this.apiUrl}/${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`;
    return this.http.get<RecipeModel>(url);
  }
  getRandomRecipes(numberOfRecipes: number): Observable<RecipeModel[]> {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=5aabdf9ebc6846b590b4cea0b46247fc&number=${numberOfRecipes}`;
    return this.http
      .get<{ recipes: RecipeModel[] }>(url)
      .pipe(map((response) => response.recipes));
  }

  getRecipeById(id: number) {
    const url = `${this.apiUrl}/${id}/information?includeNutrition=false&apiKey=${this.apiKey}`;
    return this.http.get<RecipeModel>(url);
  }

  getWeekPlanMeal() {
    const url = `https://api.spoonacular.com/mealplanner/dasda/week/2023-11-20?apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getIngredients() {
    const url =
      'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1';
    return this.http.get<any>(url);
  }

  getMealPlanDay(date: string) {
    const url = `https://api.spoonacular.com/mealplanner/gjorgi123/day/${date}?hash=${this.hash}&apiKey=${this.apiKey}`;
    // const url = `https://api.spoonacular.com/mealplanner/gjorgi123/day/2023-12-05?hash=94729fa27673c4d63cdda2c7ae92bacb19eed41e&apiKey=5aabdf9ebc6846b590b4cea0b46247fc`;
    return this.http.get<any>(url);
  }
}
