import { SystemConfigComponent } from './system-config.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: SystemConfigComponent }
];
export const SystemConfigRouter = RouterModule.forChild(routes);