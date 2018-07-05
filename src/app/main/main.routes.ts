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

            { path: 'post', loadChildren: './post/post.module#PostModule' },

            { path: 'order', loadChildren: './order/order.module#OrderModule' },

            { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' },

            { path: 'report', loadChildren: './report/report.module#ReportModule' },

            { path: 'brand', loadChildren: './brand/brand.module#BrandModule' },

            { path: 'origin', loadChildren: './origin/origin.module#OriginModule' },

            { path: 'post-category', loadChildren: './post-category/post-category.module#PostCategoryModule' },

            { path: 'slide', loadChildren: './slide/slide.module#SlideModule' },

            { path: 'page', loadChildren: './page/page.module#PageModule' },

            { path: 'system-config', loadChildren: './system-config/system-config.module#SystemConfigModule' },

            { path: 'menu', loadChildren: './menu/menu.module#MenuModule' },

            { path: 'support-online', loadChildren: './support-online/support-online.module#SupportOnlineModule' },

            { path: 'price-request', loadChildren: './price-request/price-request.module#PriceRequestModule' }
        ]
    }
];