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
  constructor(private http: HttpClient) {}

  getRecipeInformation(recipeId: number): Observable<RecipeModel> {
    const url = `${
      this.apiUrl
    }/${732429}/information?includeNutrition=false&apiKey=${this.apiKey}`;
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
}
