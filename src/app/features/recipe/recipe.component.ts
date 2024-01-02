import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { Location } from '@angular/common';
import { recipeService } from 'src/app/services/recipeService';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: RecipeModel | undefined;
  currentId: number | undefined;
  mealPlanDayDate: string = '';
  activeTab: string = 'Ingredients';

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
      console.log('params', params);
      this.mealPlanDayDate = params['date'];
      console.log('this.selectedDate on INIT:', this.mealPlanDayDate);
    });
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

        console.log('Fetched recipe:', this.recipe);
      });
  }
  stripHtmlTags(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  addToFavorites() {
    if (this.recipe) {
      this.recipe.isFavorite = !this.recipe.isFavorite;
      console.log(this.recipe.isFavorite);
    }
  }

  navigateBack() {
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams.hasOwnProperty('date')) {
      // 'date' parameter exists, navigate to meal-plan-day with the existing date
      this.router.navigate(['/meal-plan-day'], {
        queryParams: { date: queryParams['date'] },
      });
    } else {
      // 'date' parameter doesn't exist, navigate back or to another route
      this.location.back();
    }
  }
  toggleActive(tabName: string): void {
    this.activeTab = tabName;
    // Add logic here to handle tab switching or content display based on the selected tab
  }
}
