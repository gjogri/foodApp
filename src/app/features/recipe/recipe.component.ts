import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';

import { recipeService } from 'src/app/services/recipeService';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: RecipeModel | undefined;
  currentId: number | undefined;
  constructor(
    private recipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentId = Number(params.get('id'));
    });
    this.currentId === 0
      ? this.router.navigate(['/home']) // home for now
      : this.getRecipeById(this.currentId || 0);
    console.log(this.currentId);
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
    console.log('ADD TO FAVORITES', this.currentId);
    if (this.recipe) {
      this.recipe.isFavorite = !this.recipe.isFavorite;
      console.log(this.recipe.isFavorite);
    }
  }
}
