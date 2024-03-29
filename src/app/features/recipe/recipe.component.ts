import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipeModel';
import { Location } from '@angular/common';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: RecipeModel = new RecipeModel();
  currentId: number | undefined;
  mealPlanDayDate: string = '';
  activeTab: string = 'Ingredients';
  storedItem = '';
  localStorageValues: any[] = [];
  isIdPresent: boolean = false;
  favorite: boolean = false;
  constructor(
    private recipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentId = Number(params.get('id'));
    });
    this.currentId === 0
      ? this.router.navigate(['/home'])
      : this.getRecipeById(this.currentId || 0);
    this.recipeService
      .getDate()
      .subscribe((date) => (this.mealPlanDayDate = date));

    this.route.queryParams.subscribe((params) => {
      this.mealPlanDayDate = params['date'];
    });

    const favoritesData = localStorage.getItem('favorites');

    if (favoritesData) {
      let favoritesList: any[] = [];
      if (favoritesData) {
        favoritesList = JSON.parse(favoritesData);
        if (favoritesList.includes(this.currentId)) {
          this.recipe.isFavorite = true;
          this.isIdPresent = true;
        } else {
          this.recipe.isFavorite = false;
        }
      }
    }
  }

  getRecipeById(id: number) {
    this.recipeService
      .getRecipeById(id)
      .subscribe((singleRecipe: RecipeModel) => {
        this.recipe = singleRecipe;
        this.recipe &&
          this.recipe.instructions &&
          (this.recipe.instructions = this.stripHtmlTags(
            this.recipe.instructions
          ));
      });
  }
  stripHtmlTags(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  addToFavorites() {
    if (this.recipe && !this.isIdPresent) {
      this.recipeService.addToFavorites(this.recipe);

      this.isIdPresent = false;
    } else if (this.recipe && this.isIdPresent) {
      this.recipeService.removeFavoritesFromLocalStorage(this.recipe.id);
      this.isIdPresent = false;
      console.error('Recipe is undefined');
    }
  }

  navigateBack() {
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams.hasOwnProperty('date')) {
      this.router.navigate(['/meal-plan-day'], {
        queryParams: { date: queryParams['date'] },
      });
    } else {
      this.location.back();
    }
  }
  toggleActive(tabName: string): void {
    this.activeTab = tabName;
  }
}
