import { TestBed } from '@angular/core/testing';

import { AuthReturnGuard } from './auth-return.guard';

describe('AuthReturnGuard', () => {
  let guard: AuthReturnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthReturnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
