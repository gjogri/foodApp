import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chartData } from 'src/app/_models/chartData';
import { Items } from 'src/app/_models/items';
import { Nutrient } from 'src/app/_models/nutrient';
import { recipeService } from 'src/app/services/recipeService';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
@Component({
  selector: 'app-meal-plan-day',
  templateUrl: './meal-plan-day.component.html',
  styleUrls: ['./meal-plan-day.component.scss'],
})
export class MealPlanDayComponent implements OnInit {
  nutrientSummary: Nutrient[] = [];
  selectedDate: string = '';
  selectedDateFromParams: string = '';
  isSelectedDate = false;
  breakfastItems: Items[] = [];
  lunchItems: Items[] = [];
  dinnerItems: Items[] = [];
  chartDataSummary: chartData[] = [];
  chartDataBreakfast: chartData[] = [];
  chartDataLunch: chartData[] = [];
  chartDataDinner: chartData[] = [];
  macroNutrient = ['Carbohydrates', 'Fat', 'Protein', 'Calories'];
  selectedChartData: { name: string; value: number }[] = [];
  xAxisLabel = 'gr';
  yAxisLabel = 'Macro Nutrition';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  todayDate: string = '';
  selectedAllMeal: boolean = true;
  isSelectedBreakfast: boolean = false;
  isSelectedLunch: boolean = false;
  isSelectedDinner: boolean = false;
  imageUrlFallback = 'https://eastinthewest.co.uk/images/mob-index-img.jpg';
  noneSelected =
    !this.isSelectedBreakfast &&
    !this.isSelectedLunch &&
    !this.isSelectedDinner;

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
  }

  onDateSelected(event: any) {
    this.todayDate = event.value;
    this.getRecipeOnDate(this.todayDate);
  }

  getRecipeOnDate(date: string) {
    this.breakfastItems = [];
    this.lunchItems = [];
    this.dinnerItems = [];
    this.updateQueryParams(date);
    this.recipeService.setDate(date);
    this.isSelectedDate = true;
    this.updateSelectedChartData();
    this.getMealPlanDay();
    this.cdr.detectChanges();
  }
  getMealPlanDay() {
    if (this.todayDate) {
      this.recipeService.getMealPlanDay(this.todayDate).subscribe(
        (data: any) => {
          this.chartDataSummary = this.filterChartData(data.nutritionSummary);

          this.chartDataBreakfast = this.filterChartData(
            data.nutritionSummaryBreakfast
          );
          this.chartDataLunch = this.filterChartData(
            data.nutritionSummaryLunch
          );
          this.chartDataDinner = this.filterChartData(
            data.nutritionSummaryDinner
          );
          this.updateSelectedChartData();
          data.items.forEach((item: Items) => {
            this.recipeService.getRecipeById(item.value.id).subscribe(
              (recipe) => {
                item.imageUrl = recipe.image;
                item.value.preparationMinutes = recipe.preparationMinutes;
              },
              (error) => {
                item.imageUrl = this.imageUrlFallback;
              }
            );

            if (item.slot === 1) {
              this.breakfastItems.push(item);
            } else if (item.slot === 2) {
              this.lunchItems.push(item);
            } else {
              this.dinnerItems.push(item);
            }
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

  toggleSelection(selectedMeal: string) {
    if (selectedMeal === 'Breakfast') {
      this.isSelectedBreakfast = !this.isSelectedBreakfast;
    } else if (selectedMeal === 'Lunch') {
      this.isSelectedLunch = !this.isSelectedLunch;
    } else if (selectedMeal === 'Dinner') {
      this.isSelectedDinner = !this.isSelectedDinner;
    }

    this.selectedAllMeal =
      !this.isSelectedDinner &&
      !this.isSelectedLunch &&
      !this.isSelectedBreakfast;
    this.updateSelectedChartData();
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

  updateSelectedChartData() {
    if (this.isSelectedBreakfast) {
      this.selectedChartData = this.chartDataBreakfast;
    } else if (this.isSelectedLunch) {
      this.selectedChartData = this.chartDataLunch;
    } else if (this.isSelectedDinner) {
      this.selectedChartData = this.chartDataDinner;
    } else if (this.noneSelected) {
      this.selectedChartData = this.chartDataSummary;
    }
    this.cdr.detectChanges();
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
