import { BatteryTerminalComponent } from './battery-terminal.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: BatteryTerminalComponent }
];
export const BatteryTerminalRouter = RouterModule.forChild(routes);