import { BrandComponent } from './brand.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: BrandComponent }
];
export const BrandRouter = RouterModule.forChild(routes);