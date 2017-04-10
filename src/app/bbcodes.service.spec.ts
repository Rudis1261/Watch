import { TestBed, inject } from '@angular/core/testing';

import { BbcodesService } from './bbcodes.service';

describe('BbcodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BbcodesService]
    });
  });

  it('should ...', inject([BbcodesService], (service: BbcodesService) => {
    expect(service).toBeTruthy();
  }));
});
