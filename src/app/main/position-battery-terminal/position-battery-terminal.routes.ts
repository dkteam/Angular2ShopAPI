import { PositionBatteryTerminalComponent } from './position-battery-terminal.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: PositionBatteryTerminalComponent }
];
export const PositionBatteryTerminalRouter = RouterModule.forChild(routes);