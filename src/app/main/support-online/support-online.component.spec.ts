import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportOnlineComponent } from './support-online.component';

describe('SupportOnlineComponent', () => {
  let component: SupportOnlineComponent;
  let fixture: ComponentFixture<SupportOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
