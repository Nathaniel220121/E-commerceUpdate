import { Routes } from '@angular/router';
// import { ProductDetailsComponent } from './home/product-details/product-details.component';

import { LayoutComponent }      from './layout/layout.component';
import { RegisterComponent }    from './login/register/register.component';

export const AppRoutes: Routes = [
    { path: '',
    component: LayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) }
        ]},
        {path: 'register',component: RegisterComponent}
        // {path: 'product',component: ProductDetailsComponent}
]
