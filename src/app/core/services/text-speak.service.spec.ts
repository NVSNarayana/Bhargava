import { TestBed } from '@angular/core/testing';

import { TextSpeakService } from './text-speak.service';

describe('TextSpeakService', () => {
  let service: TextSpeakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSpeakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
