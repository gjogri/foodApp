import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-foodItem',
  templateUrl: './foodItem.component.html',
  styleUrls: ['./foodItem.component.scss'],
})
export class FoodItemComponent implements OnInit {
  recipes: any[] = [];
  category: string | null = null;
  numberOfRecipes: number = 999;
  pageSlice: any[] = [];
  startIndex = 0;
  endIndex = 24;
  pageIndex = 1;
  currentId: number | undefined;
  isIdPresent: boolean = false;
  constructor(
    private recipeService: recipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'] || null;

      if (this.category === 'favourite-recipes') {
        this.getAllFavorites();
        console.log(this.category);
      } else {
        if (this.category !== null) {
          console.log(this.category);
          this.getRecipes(this.category, this.numberOfRecipes);
          /// treba da im se izboi srcevo ako se vo favorites veke
        } else {
          console.log('Category is null. Handle appropriately.');
        }
      }
    });
    console.log('HERE');
  }

  getRecipes(ingredient: string, numberOfRecipes: number) {
    this.recipeService
      .getRecipeByIngredient(ingredient, numberOfRecipes)
      .subscribe(
        (recipe: any) => {
          this.numberOfRecipes = recipe.totalResults;
          if (this.numberOfRecipes > 0) {
            recipe.results.forEach((items: RecipeModel[]) => {
              this.recipes.push(items);
            });
            const ids = this.recipes.map((recipe: RecipeModel) => recipe.id);
            console.log('ID:', ids);
            const favoritesData = localStorage.getItem('favorites');
            console.log('favoritesData:', favoritesData);
            console.log('recipesss', this.recipes);
            if (favoritesData) {
              let favoritesList: any[] = [];
              if (favoritesData) {
                favoritesList = JSON.parse(favoritesData);

                if (favoritesList.includes(this.currentId)) {
                  this.isIdPresent = true;
                }
              }
            }
          }
        },
        (error) => {
          console.error('Error fetching random recipes:', error);
        }
      );
  }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.endIndex > this.recipes.length) {
      this.endIndex = this.recipes.length;
    }
  }

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }

  getRecipe(id: number) {
    this.recipeService.getRecipeById(id).subscribe(
      (recipe: RecipeModel) => {
        this.recipes.push(recipe);
        console.log('this.favoriteRecipes', this.recipes);
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }

  getAllFavorites() {
    const favoritesData = localStorage.getItem('favorites');
    let favoritesList: number[] = [];
    if (favoritesData) {
      favoritesList = JSON.parse(favoritesData);
      favoritesList.forEach((id: number) => {
        this.getRecipe(id);
      });
    }
    console.log('favoritesList', favoritesList);
  }
}
