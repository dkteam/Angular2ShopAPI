import { SlideComponent } from './slide.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: SlideComponent }
];
export const SlideRouter = RouterModule.forChild(routes);