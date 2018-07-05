import { SupportOnlineModule } from './support-online.module';

describe('SupportOnlineModule', () => {
  let supportOnlineModule: SupportOnlineModule;

  beforeEach(() => {
    supportOnlineModule = new SupportOnlineModule();
  });

  it('should create an instance', () => {
    expect(supportOnlineModule).toBeTruthy();
  });
});
