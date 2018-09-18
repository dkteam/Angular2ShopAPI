import { CarBrandComponent } from './car-brand.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: CarBrandComponent }
];
export const CarBrandRouter = RouterModule.forChild(routes);