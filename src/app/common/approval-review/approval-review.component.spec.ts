import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalReviewComponent } from './approval-review.component';

describe('ApprovalReviewComponent', () => {
  let component: ApprovalReviewComponent;
  let fixture: ComponentFixture<ApprovalReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
