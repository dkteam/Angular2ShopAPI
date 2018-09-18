import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLineComponent } from './car-line.component';

describe('CarLineComponent', () => {
  let component: CarLineComponent;
  let fixture: ComponentFixture<CarLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
