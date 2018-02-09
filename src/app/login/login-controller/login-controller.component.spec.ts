import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginControllerComponent } from './login-controller.component';

describe('LoginControllerComponent', () => {
  let component: LoginControllerComponent;
  let fixture: ComponentFixture<LoginControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
