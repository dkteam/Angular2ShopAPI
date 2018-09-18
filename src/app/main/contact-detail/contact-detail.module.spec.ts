import { ContactDetailModule } from './contact-detail.module';

describe('ContactDetailModule', () => {
  let contactDetailModule: ContactDetailModule;

  beforeEach(() => {
    contactDetailModule = new ContactDetailModule();
  });

  it('should create an instance', () => {
    expect(contactDetailModule).toBeTruthy();
  });
});
