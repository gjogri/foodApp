import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';
@Component({
  selector: 'app-foodItem',
  templateUrl: './foodItem.component.html',
  styleUrls: ['./foodItem.component.scss'],
})
export class FoodItemComponent implements OnInit {
  burgers: any[] = [];
  category: string | null = null;
  numberOfRecipes: number = 300;

  constructor(
    private recipeService: recipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('this.numberOfRecipes ON INIT', this.numberOfRecipes);
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'] || null;
      if (this.category) {
        this.getRecipes(this.category, this.numberOfRecipes);
      }
    });
    console.log(this.category);
    console.log(this.numberOfRecipes);
  }

  getRecipes(ingredient: string, numberOfRecipes: number) {
    this.recipeService
      .getRecipeByIngredient(ingredient, numberOfRecipes)
      .subscribe(
        (recipes: any) => {
          this.numberOfRecipes = recipes.totalResults;
          console.log('TTT', this.numberOfRecipes);
          if (this.numberOfRecipes > 0) {
            recipes.results.forEach((x: RecipeModel[]) => {
              this.burgers.push(x);
            });
          }
          console.log('THIS BURGERS', this.burgers);
        },
        (error) => {
          console.error('Error fetching random recipes:', error);
        }
      );
  }
}
