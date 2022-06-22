import { TestBed } from '@angular/core/testing';

import { DireitvasIfService } from './direitvas-if.service';

describe('DireitvasIfService', () => {
  let service: DireitvasIfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireitvasIfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
