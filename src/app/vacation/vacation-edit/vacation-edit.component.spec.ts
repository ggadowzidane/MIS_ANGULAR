import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationEditComponent } from './vacation-edit.component';

describe('VacationEditComponent', () => {
  let component: VacationEditComponent;
  let fixture: ComponentFixture<VacationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
