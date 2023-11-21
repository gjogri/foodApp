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
    // const url =
    //   'https://api.spoonacular.com/recipes/732429/information?includeNutrition=false&apiKey=5aabdf9ebc6846b590b4cea0b46247fc';
    const url = `${
      this.apiUrl
    }/${732429}/information?includeNutrition=false&apiKey=${this.apiKey}`;
    console.log('URL:', url);
    return this.http.get<RecipeModel>(url);
  }

  // private mapIngredients(extendedIngredients: any[]): SimplifiedIngredient[] {
  //   return extendedIngredients.map((ingredient) => ({
  //     name: ingredient.name,
  //     amount: ingredient.amount,
  //     // Add other necessary fields here if available in your API response
  //   }));
  // }
}
