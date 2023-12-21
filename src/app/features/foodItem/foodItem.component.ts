import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from 'src/app/_models/recipeModel';
import { recipeService } from 'src/app/services/recipeService';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  constructor(
    private recipeService: recipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'] || null;
      if (this.category) {
        this.getRecipes(this.category, this.numberOfRecipes);
      }
    });
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
}
