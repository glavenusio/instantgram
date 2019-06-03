import { TestBed } from '@angular/core/testing';

import { DataServiceResolver } from './data-resolver.service';

describe('DataServiceResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataServiceResolver = TestBed.get(DataServiceResolver);
    expect(service).toBeTruthy();
  });
});
