import { TestBed } from '@angular/core/testing';

import { NftPurchaseService } from './nft-purchase.service';

describe('NftPurchaseService', () => {
  let service: NftPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
