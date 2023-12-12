import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemComponent } from './foodItem.component';

describe('foodItemComponent', () => {
  let component: FoodItemComponent;
  let fixture: ComponentFixture<FoodItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodItemComponent],
    });
    fixture = TestBed.createComponent(FoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
