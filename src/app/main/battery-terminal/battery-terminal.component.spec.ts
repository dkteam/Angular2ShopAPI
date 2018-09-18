import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryTerminalComponent } from './battery-terminal.component';

describe('BatteryTerminalComponent', () => {
  let component: BatteryTerminalComponent;
  let fixture: ComponentFixture<BatteryTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
