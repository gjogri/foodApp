import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Items } from 'src/app/_models/items';
import { Nutrition } from 'src/app/_models/nutrition';
import { recipeService } from 'src/app/services/recipeService';

@Component({
  selector: 'app-meal-plan-day',
  templateUrl: './meal-plan-day.component.html',
  styleUrls: ['./meal-plan-day.component.scss'],
})
export class MealPlanDayComponent implements OnInit {
  nutrition: Nutrition | undefined;
  itemList: Items[] = [];
  allData: any[] = [];
  selectedDate: string | null = null;
  constructor(
    private recipeService: recipeService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  getMealPlanDay() {
    if (this.selectedDate) {
      this.recipeService.getMealPlanDay(this.selectedDate).subscribe(
        (data: any) => {
          console.log('test');
          console.log('all data', data);
          data.items.forEach((item: any) => {
            this.itemList.push(item.value);
            console.log(this.itemList);
            this.getRecipeInformation(22457672);
          });
        },
        (error: any) => {
          console.error('Error fetching week plan:', error);
        }
      );

      console.log('this.items', this.itemList);
      this.cdr.detectChanges();
    }
  }
  onDateSelected(event: any) {
    this.itemList = [];
    this.selectedDate = event.target.value;

    this.getMealPlanDay();
  }

  getRecipeInformation(recipeId: number) {
    this.recipeService
      .getRecipeInformation(recipeId)
      .subscribe((data) => console.log(data));
  }
}

// console.log('ITEMLIST', this.itemList);
// if (data.items && data.items.length > 0) {
//   data.items.forEach((item: any) => {
//     this.itemList.push(item.value);
//     this.cdr.detectChanges();
//   });
//   console.log('All Items:', this.itemList);
// } else {
//   console.log('No items found in the response.');
// }
// this.nutrition = data.nutritionSummary.nutrients.find(
//   (nutrient: any) => nutrient.name === 'Calories'
// );

// this.nutrition = data.nutritionSummary.nutrients.find(
//   (nutrient: any) => nutrient.name === 'Calories'
// );
