import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chartData } from 'src/app/_models/chartData';
import { Items } from 'src/app/_models/items';
import { Nutrient } from 'src/app/_models/nutrient';

import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-meal-plan-day',
  templateUrl: './meal-plan-day.component.html',
  styleUrls: ['./meal-plan-day.component.scss'],
})
export class MealPlanDayComponent implements OnInit {
  nutrient: Nutrient[] = [];
  selectedDate: string | null = null;
  isSelectedDate = false;
  breakfastItems: Items[] = [];
  lunchItems: Items[] = [];
  dinnerItems: Items[] = [];
  chartData: chartData[] = [];
  xAxisLabel = 'Macro Nutrition';
  yAxisLabel = 'Population';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  constructor(
    private recipeService: recipeService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {}

  getMealPlanDay() {
    if (this.selectedDate) {
      this.recipeService.getMealPlanDay(this.selectedDate).subscribe(
        (data: any) => {
          this.nutrient.push(data.nutritionSummary.nutrients);
          data.nutritionSummary.nutrients.forEach((nutrient: chartData) => {
            console.log(nutrient);
            // if (nutrient.carbohydrate.name === 'Carbohydrate') {
            //   console.log(
            //     'nutrient.carbohydrate.name',
            //     nutrient.carbohydrate.name
            //   );
            // }
            // this.chartData.push({
            //   name: nutrient.name,
            //    percentOfDailyNeeds: nutrient.percentOfDailyNeeds,
            //  });
          });
          console.log(' chartData:', this.chartData);
          //

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
          console.error('Error fetching week plan:', error);
        }
      );

      this.cdr.detectChanges();
    }
  }
  onDateSelected(event: any) {
    this.breakfastItems = [];
    this.lunchItems = [];
    this.dinnerItems = [];
    this.selectedDate = event.target.value;
    this.isSelectedDate = true;

    this.getMealPlanDay();
  }

  getRecipeInformation(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }

  // chartData: chartData[] = [
  //   {
  //     name: 'Germany',
  //     value: 8940000,
  //   },
  //   {
  //     name: 'USA',
  //     value: 5000000,
  //   },
  //   // Add more data...
  // ];
}
