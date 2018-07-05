import { PriceRequestModule } from './price-request.module';

describe('PriceRequestModule', () => {
  let priceRequestModule: PriceRequestModule;

  beforeEach(() => {
    priceRequestModule = new PriceRequestModule();
  });

  it('should create an instance', () => {
    expect(priceRequestModule).toBeTruthy();
  });
});
