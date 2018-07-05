import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRequestComponent } from './price-request.component';

describe('PriceRequestComponent', () => {
  let component: PriceRequestComponent;
  let fixture: ComponentFixture<PriceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
