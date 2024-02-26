import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { RecipeModel } from '../_models/recipeModel';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class recipeService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private apiUrl = 'https://api.spoonacular.com/recipes';
  private apiSearchUrl =
    'https://api.spoonacular.com/food/ingredients/search?sort=calories&sortDirection=desc&';
  private apiKey = '5aabdf9ebc6846b590b4cea0b46247fc';
  private hash = '94729fa27673c4d63cdda2c7ae92bacb19eed41e';
  private dateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  isIdPresent: boolean = false;
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

  getRecipesByIds(recipeIds: number[]): RecipeModel[] {
    let recipes: RecipeModel[] = [];

    recipeIds.forEach((id) => {
      this.getRecipeById(id).subscribe((x) => {
        recipes.push(x);
      });
    });

    return recipes;
  }

  getRecipeByIngredient(ingredient: string, numberOfRecipes: number) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&maxFat=1000&number=${numberOfRecipes}&apiKey=5aabdf9ebc6846b590b4cea0b46247fc`;
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
    return this.http.get<any>(url);
  }

  setDate(newDate: string) {
    this.dateSubject.next(newDate);
    console.log('newDate', newDate);
  }

  getDate(): Observable<string> {
    return this.dateSubject.asObservable();
  }

  getRandomJokes() {
    const url = `https://api.spoonacular.com/food/jokes/random?apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  searchRecipeByProduct(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.append(key, params[key].toString());
      }
    });
    httpParams = httpParams.append('apiKey', this.apiKey);

    const apiUrlWithParams = `${this.apiSearchUrl}${httpParams.toString()}`;
    console.log('apiUrlWithParams', apiUrlWithParams);
    return this.http.get<any>(apiUrlWithParams);
  }

  addToFavorites(recipe: RecipeModel) {
    if (recipe) {
      console.log('IS FAVORITED', recipe.isFavorite);
      recipe.isFavorite = !recipe.isFavorite;
      if (recipe.isFavorite) {
        ('test');
        this.addToFavoritesLocalStorage(recipe.id);

        this.snackBar.open('added to favorites', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        recipe.isFavorite = false;
        this.removeFavoritesFromLocalStorage(recipe.id);
        this.snackBar.open('removed from favorites', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.isIdPresent = false;
      }
    }
  }

  addToFavoritesLocalStorage(recipeId: number) {
    const favoritesData = localStorage.getItem('favorites');
    let favoritesList: any[] = [];
    if (favoritesData) {
      favoritesList = JSON.parse(favoritesData);
      favoritesList.push(recipeId);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    } else {
      const favoritesList: any[] = [];
      favoritesList.push(recipeId);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }
  }
  removeFavoritesFromLocalStorage(recipeId: number) {
    const favoritesData = localStorage.getItem('favorites');
    let favoritesList: any[] = [];
    if (favoritesData) {
      favoritesList = JSON.parse(favoritesData);
      if (favoritesList.includes(recipeId)) {
        favoritesList = favoritesList.filter((id) => id !== recipeId);
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
      }
    }
  }
}
