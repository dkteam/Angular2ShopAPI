import { OriginComponent } from './origin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: OriginComponent }
];
export const OriginRouter = RouterModule.forChild(routes);