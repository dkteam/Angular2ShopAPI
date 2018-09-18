import { ContactDetailComponent } from './contact-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ContactDetailComponent }
];
export const ContactDetailRouter = RouterModule.forChild(routes);