import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparableProductsComponent } from './comparable-products.component';

describe('ComparableProductsComponent', () => {
  let component: ComparableProductsComponent;
  let fixture: ComponentFixture<ComparableProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparableProductsComponent]
    });
    fixture = TestBed.createComponent(ComparableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
