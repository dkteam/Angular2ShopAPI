import { PositionBatteryTerminalModule } from './position-battery-terminal.module';

describe('PositionBatteryTerminalModule', () => {
  let positionBatteryTerminalModule: PositionBatteryTerminalModule;

  beforeEach(() => {
    positionBatteryTerminalModule = new PositionBatteryTerminalModule();
  });

  it('should create an instance', () => {
    expect(positionBatteryTerminalModule).toBeTruthy();
  });
});
