import { PriceRequestComponent } from './price-request.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: PriceRequestComponent }
];
export const PriceRequestRouter = RouterModule.forChild(routes);