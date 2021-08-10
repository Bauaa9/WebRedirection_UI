/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginServicesService } from './loginServices.service';

describe('Service: LoginServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginServicesService]
    });
  });

  it('should ...', inject([LoginServicesService], (service: LoginServicesService) => {
    expect(service).toBeTruthy();
  }));
});
