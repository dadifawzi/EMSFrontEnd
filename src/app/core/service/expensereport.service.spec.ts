import { TestBed } from '@angular/core/testing';

import { ExpensereportService } from './expensereport.service';

describe('ExpensereportService', () => {
  let service: ExpensereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
