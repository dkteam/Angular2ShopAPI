import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        //localhost:4200/main
        path: '', component: MainComponent, children: [
            //localhost:4200/main/
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            //localhost:4200/main/home
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            //localhost:4200/main/user
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            //localhost:4200/main/role
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            //localhost:4200/main/function
            { path: 'function', loadChildren: './function/function.module#FunctionModule' },

            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },
            
            { path: 'product', loadChildren: './product/product.module#ProductModule' },

            { path: 'order', loadChildren: './order/order.module#OrderModule' },

            { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' }
        ]
    }
];