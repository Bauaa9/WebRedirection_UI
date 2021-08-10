/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductHandlingService } from './ProductHandling.service';

describe('Service: ProductHandling', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductHandlingService]
    });
  });

  it('should ...', inject([ProductHandlingService], (service: ProductHandlingService) => {
    expect(service).toBeTruthy();
  }));
});
