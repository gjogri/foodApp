import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanDayComponent } from './meal-plan-day.component';

describe('MealPlanDayComponent', () => {
  let component: MealPlanDayComponent;
  let fixture: ComponentFixture<MealPlanDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanDayComponent]
    });
    fixture = TestBed.createComponent(MealPlanDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
