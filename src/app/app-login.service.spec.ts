import { TestBed, inject } from '@angular/core/testing';

import { AppLoginService } from './app-login.service';

describe('AppLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoginService]
    });
  });

  it('should be created', inject([AppLoginService], (service: AppLoginService) => {
    expect(service).toBeTruthy();
  }));
});
