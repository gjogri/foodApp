import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
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

  ngOnInit(): void {}

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }

  addToFavorites() {
    if (this.recipe) {
      this.recipeService.addToFavorites(this.recipe);
      console.log('TITLE:', this.recipe.title);
    } else {
      console.error('Recipe is undefined');
    }
  }

  imageError(recipe: any) {
    recipe.image =
      'https://static.vecteezy.com/system/resources/previews/002/621/029/non_2x/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg';
  }
}
