import { TestBed } from '@angular/core/testing';

import { EmployeeSelectionService } from './employee-selection.service';

describe('EmployeeSelectionService', () => {
  let service: EmployeeSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
