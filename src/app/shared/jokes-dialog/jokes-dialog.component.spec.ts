import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesDialogComponent } from './jokes-dialog.component';

describe('JokesDialogComponent', () => {
  let component: JokesDialogComponent;
  let fixture: ComponentFixture<JokesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokesDialogComponent]
    });
    fixture = TestBed.createComponent(JokesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
