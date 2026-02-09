import { TestBed } from '@angular/core/testing';

import { UserfeedService } from './userfeed.service';

describe('UserfeedService', () => {
  let service: UserfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
