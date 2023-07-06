import { TestBed } from '@angular/core/testing';

import { StartingDataService } from './starting-data.service';

describe('StartingDataService', () => {
  let service: StartingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
