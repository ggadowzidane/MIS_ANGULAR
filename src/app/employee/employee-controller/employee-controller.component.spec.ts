import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeControllerComponent } from './employee-controller.component';

describe('EmployeeControllerComponent', () => {
  let component: EmployeeControllerComponent;
  let fixture: ComponentFixture<EmployeeControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
