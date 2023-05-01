import { Routes } from '@angular/router';

import { AboutUsComponent }         from '../home/about-us/about-us.component';
import { BlogComponent }            from '../home/blog/blog.component';
import { CartComponent }            from '../home/cart/cart.component';
import { CategoryDetailComponent } from '../home/category-detail/category-detail.component';
import { ContactUsComponent }       from '../home/contact-us/contact-us.component';
import { HomeComponent }            from '../home/home/home.component';
import { ProductDetailsComponent }  from '../home/product-details/product-details.component';
import { ProfileComponent }         from '../home/profile/profile.component';
import { ProjectListComponent }     from '../home/project-list/project-list.component';
import { SearchListComponent }      from '../home/search-list/search-list.component';
import { WishListComponent }        from '../home/wish-list/wish-list.component';

export const LayoutRoutes: Routes = [
    { path: '',                             component: HomeComponent },
    { path: 'profile',                      component: ProfileComponent },
    { path: 'contact',                      component: ContactUsComponent },
    { path: 'about-us',                     component: AboutUsComponent },
    { path: 'blog',                         component: BlogComponent },
    { path: 'product-details/:pId',         component: ProductDetailsComponent },
    { path: 'product-list/:cId',            component: ProjectListComponent },
    { path: 'products-list',                 component: SearchListComponent },
    { path: 'category-detail/:cId',         component: CategoryDetailComponent },
    { path: 'cart',                         component: CartComponent },
    { path: 'wish-list',                    component: WishListComponent }
]
