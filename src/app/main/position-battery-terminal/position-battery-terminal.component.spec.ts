import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionBatteryTerminalComponent } from './position-battery-terminal.component';

describe('PositionBatteryTerminalComponent', () => {
  let component: PositionBatteryTerminalComponent;
  let fixture: ComponentFixture<PositionBatteryTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionBatteryTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionBatteryTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
