import { MenuComponent } from './menu.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: MenuComponent }
];
export const MenuRouter = RouterModule.forChild(routes);