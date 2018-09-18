import { BatteryTerminalModule } from './battery-terminal.module';

describe('BatteryTerminalModule', () => {
  let batteryTerminalModule: BatteryTerminalModule;

  beforeEach(() => {
    batteryTerminalModule = new BatteryTerminalModule();
  });

  it('should create an instance', () => {
    expect(batteryTerminalModule).toBeTruthy();
  });
});
