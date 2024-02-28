import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeModel } from 'src/app/models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-comparable-products',
  templateUrl: './comparable-products.component.html',
  styleUrls: ['./comparable-products.component.scss'],
})
export class ComparableProductsComponent implements OnInit {
  public myForm!: FormGroup;
  recipes: number[] = [];
  allRecipes: RecipeModel[] = [];
  category: string | null = null;
  constructor(private fb: FormBuilder, private recipeService: recipeService) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      query: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      number: ['99', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      minProteinPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
      maxProteinPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
      minFatPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
      maxFatPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
      minCarbsPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
      maxCarbsPercent: ['', [Validators.pattern(/^\d{1,2}$/)]],
    });
  }

  submitForm() {
    if (this.myForm.valid) {
      this.recipes.splice(0, this.recipes.length);

      this.category = this.myForm.value.query;
    }
    const params: any = { ...this.myForm.value };

    Object.keys(params).forEach((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === ''
      ) {
        delete params[key];
      }
    });

    this.recipeService.searchRecipeByProduct(params).subscribe(
      (recipe: any) => {
        let recipes: RecipeModel[] = [];
        recipe.results.forEach((singleRecipe: RecipeModel) => {
          recipes.push(singleRecipe);
        });
        this.allRecipes = recipes;
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
    this.myForm.reset();
  }
}
