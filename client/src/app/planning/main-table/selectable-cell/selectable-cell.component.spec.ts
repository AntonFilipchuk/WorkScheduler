import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableCellComponent } from './selectable-cell.component';

describe('SelectableCellComponent', () => {
  let component: SelectableCellComponent;
  let fixture: ComponentFixture<SelectableCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectableCellComponent]
    });
    fixture = TestBed.createComponent(SelectableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
