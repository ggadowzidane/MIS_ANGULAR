import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationViewComponent } from './vacation-view.component';

describe('VacationViewComponent', () => {
  let component: VacationViewComponent;
  let fixture: ComponentFixture<VacationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
