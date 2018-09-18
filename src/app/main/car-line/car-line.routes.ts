import { CarLineComponent } from './car-line.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: CarLineComponent }
];
export const CarLineRouter = RouterModule.forChild(routes);