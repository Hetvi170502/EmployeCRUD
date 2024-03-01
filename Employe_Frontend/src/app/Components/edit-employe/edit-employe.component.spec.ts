import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeComponent } from './edit-employe.component';

describe('EditEmployeComponent', () => {
  let component: EditEmployeComponent;
  let fixture: ComponentFixture<EditEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeComponent]
    });
    fixture = TestBed.createComponent(EditEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
