import { CarBrandModule } from './car-brand.module';

describe('CarBrandModule', () => {
  let carBrandModule: CarBrandModule;

  beforeEach(() => {
    carBrandModule = new CarBrandModule();
  });

  it('should create an instance', () => {
    expect(carBrandModule).toBeTruthy();
  });
});
