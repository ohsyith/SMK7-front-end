import { TestBed } from '@angular/core/testing';

import { getdataService } from './getdata.service';

describe('DataService', () => {
  let service: getdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(getdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
