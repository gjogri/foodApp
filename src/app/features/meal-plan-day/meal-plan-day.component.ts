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

  selectedAllMeal: boolean = true;
  isSelectedBreakfast: boolean = false;
  isSelectedLunch: boolean = false;
  isSelectedDinner: boolean = false;
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
      console.log('params', params);
      this.selectedDate = params['date'];
      console.log('this.selectedDate on:::', this.selectedDate);
    });
    console.log('TEST oN INIT ');
    this.newFunction(this.selectedDate);
    console.log('TEST oN INIT ');
  }

  getMealPlanDay() {
    console.log('Get meal plan day ', this.selectedDate);
    if (this.selectedDate) {
      this.recipeService.getMealPlanDay(this.selectedDate).subscribe(
        (data: any) => {
          console.log('data.breakfast AFTER', data);
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
            this.recipeService
              .getRecipeById(item.value.id)
              .subscribe((recipe) => {
                item.imageUrl = recipe.image;
              });
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
          this.openErrorDialog(
            `No meal plan for ${this.selectedDate}.Please select another date`
          );

          console.error('Error fetching week plan:', error);
        }
      );
    }
  }
  onDateSelected(event: any) {
    // console.log('this.selectedDate on Selected:', this.selectedDate);
    // this.breakfastItems = [];
    // this.lunchItems = [];
    // this.dinnerItems = [];
    this.selectedDate = event.target.value;
    this.newFunction(this.selectedDate);
    // this.updateQueryParams(this.selectedDate);
    console.log(' this.selectedDate', this.selectedDate);
    // this.recipeService.setDate(this.selectedDate);
    // this.isSelectedDate = true;
    // this.updateSelectedChartData();
    // console.log('TEST');
    // this.getMealPlanDay();
    // this.cdr.detectChanges();
  }

  newFunction(date: string) {
    this.breakfastItems = [];
    this.lunchItems = [];
    this.dinnerItems = [];
    this.updateQueryParams(date);
    this.recipeService.setDate(date);
    this.isSelectedDate = true;
    this.updateSelectedChartData();
    console.log('TEST');
    this.getMealPlanDay();
    this.cdr.detectChanges();
  }

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId], {
      queryParams: { date: this.selectedDate },
    });
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
      console.log('test');
      this.selectedChartData = this.chartDataDinner;
    } else if (this.noneSelected) {
      console.log('noneSelected:', this.noneSelected);
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
