import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: RecipeModel = new RecipeModel();
  recipes = [];
  isIdPresent: boolean = false;
  currentId: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: recipeService
  ) {}

  ngOnInit(): void {
    const favoritesData = localStorage.getItem('favorites');

    if (favoritesData) {
      let favoritesList: any[] = [];
      if (favoritesData) {
        favoritesList = JSON.parse(favoritesData);
        if (favoritesList.includes(this.recipe.id)) {
          this.recipe.isFavorite = true;
          this.isIdPresent = true;
        } else {
          this.recipe.isFavorite = false;
        }
      }
    }
  }

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }

  addToFavorites() {
    if (this.recipe) {
      this.recipeService.addToFavorites(this.recipe);

      this.isIdPresent = false;
    } else if (this.recipe && this.isIdPresent) {
      this.isIdPresent = false;
      console.error('Recipe is undefined');
    }
  }

  imageError(recipe: any) {
    recipe.image =
      'https://static.vecteezy.com/system/resources/previews/002/621/029/non_2x/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg';
  }
  addToFavoritess(event: Event) {
    event.stopPropagation();
    // Add your logic to handle adding to favorites
  }
}
