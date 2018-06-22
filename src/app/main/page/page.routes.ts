import { PageComponent } from './page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: PageComponent }
];
export const PageRouter = RouterModule.forChild(routes);