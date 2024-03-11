import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chartData } from 'src/app/models/chartData';
import { Items } from 'src/app/models/items';
import { Nutrient } from 'src/app/models/nutrient';
import { recipeService } from 'src/app/services/recipeService';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { RecipeModel } from 'src/app/models/recipeModel';
import { MatChipListboxChange } from '@angular/material/chips';
@Component({
  selector: 'app-meal-plan-day',
  templateUrl: './meal-plan-day.component.html',
  styleUrls: ['./meal-plan-day.component.scss'],
})
export class MealPlanDayComponent implements OnInit {
  recipes: RecipeModel[] = [];
  initialDelay = 50;
  filteredRecipes: RecipeModel[] = [];
  headingText: string = 'All Recipes';
  selectedOption = '';
  receivedData: any;
  selectedDate: string = '';
  isSelectedDate = false;
  selectedChartData: chartData[] = [];
  macroNutrient = ['Carbohydrates', 'Fat', 'Protein', 'Calories'];
  todayDate: string = '';

  constructor(
    private recipeService: recipeService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.todayDate = params['date'];
    });

    this.getRecipeOnDate(this.todayDate);
    if (this.todayDate) {
      this.filteredRecipes = this.recipes;
    }
  }

  onDateSelected(event: any) {
    this.todayDate = event.value;

    this.getRecipeOnDate(this.todayDate);
    if (this.todayDate) {
      this.filteredRecipes = this.recipes;
    }
  }

  getRecipeOnDate(date: string) {
    this.updateQueryParams(date);
    this.recipeService.setDate(date);
    this.isSelectedDate = true;
    this.getMealPlanDay();
    this.cdr.detectChanges();
  }

  getMealPlanDay() {
    if (this.todayDate) {
      this.recipes = [];
      this.recipeService.getMealPlanDay(this.todayDate).subscribe(
        (data: any) => {
          this.receivedData = data;
          this.selectedChartData = this.filterChartData(
            this.receivedData.nutritionSummary
          );
          let currentDelay = this.initialDelay;

          data.items.forEach((id: Items, index: number) => {
            const itemId = parseInt(id.value.id);

            setTimeout(() => {
              this.recipeService.getRecipeById(itemId).subscribe((recipe) => {
                if (recipe) {
                  recipe.slot = id.slot;
                  this.recipes.push(recipe);
                }
              });
            }, index * currentDelay);
            currentDelay += this.initialDelay;
          });
        },
        (error: any) => {
          this.isSelectedDate = false;
          this.cdr.detectChanges();

          console.error('Error fetching week plan:', error);
        }
      );
    }
  }

  getRecipeInformation(recipeId: number) {
    this.router.navigate(
      ['/recipes', recipeId],

      {
        queryParams: { date: this.selectedDate },
      }
    );
  }

  onChipSelectionChange(event: MatChipListboxChange): void {
    this.selectedOption = event.source.value;

    if (this.selectedOption === undefined) {
      this.headingText = 'All Recipes';
      this.filteredRecipes = this.recipes;
    } else {
      const selectedValue = event.source.value.value;
      this.headingText = event.source.value.label;
      this.filteredRecipes = this.recipes.filter(
        (recipe) => recipe.slot === selectedValue
      );
    }

    let propertyName = '';
    switch (event.source.value?.label) {
      case 'Breakfast':
        propertyName = 'nutritionSummaryBreakfast';
        break;
      case 'Lunch':
        propertyName = 'nutritionSummaryLunch';
        break;
      case 'Dinner':
        propertyName = 'nutritionSummaryDinner';
        break;
      default:
        propertyName = 'nutritionSummary';
        break;
    }
    this.selectedChartData = this.filterChartData(
      this.receivedData[propertyName]
    );
  }

  filterChartData(mealData: any): { name: string; value: number }[] {
    return mealData.nutrients
      .filter((nutrient: Nutrient) =>
        this.macroNutrient.includes(nutrient.name)
      )
      .map((nutrient: Nutrient) => ({
        name: nutrient.name,
        value: nutrient.amount,
      }));
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage },
      width: '600px',
    });
  }

  updateQueryParams(date: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { date: date },
    });
  }
}
