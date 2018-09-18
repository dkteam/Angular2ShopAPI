import { CarLineModule } from './car-line.module';

describe('CarLineModule', () => {
  let carLineModule: CarLineModule;

  beforeEach(() => {
    carLineModule = new CarLineModule();
  });

  it('should create an instance', () => {
    expect(carLineModule).toBeTruthy();
  });
});
