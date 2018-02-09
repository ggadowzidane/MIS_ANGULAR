import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationAddComponent } from './vacation-add.component';

describe('VacationAddComponent', () => {
  let component: VacationAddComponent;
  let fixture: ComponentFixture<VacationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
