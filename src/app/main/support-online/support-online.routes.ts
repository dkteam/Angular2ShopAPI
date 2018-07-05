import { SupportOnlineComponent } from './support-online.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: SupportOnlineComponent }
];
export const SupportOnlineRouter = RouterModule.forChild(routes);