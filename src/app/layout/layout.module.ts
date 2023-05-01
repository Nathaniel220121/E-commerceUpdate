import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CookieService } from 'ngx-cookie-service';
import { LayoutRoutes } from './layout.routing';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from '../home/home/home.component';
import { ProfileComponent } from '../home/profile/profile.component';
import { ContactUsComponent } from '../home/contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from '../home/about-us/about-us.component';
import { BlogComponent } from '../home/blog/blog.component';
import { ProductDetailsComponent } from '../home/product-details/product-details.component';
import { CartComponent } from '../home/cart/cart.component';
import { ProjectListComponent } from '../home/project-list/project-list.component';
import { SearchListComponent } from '../home/search-list/search-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ContactUsComponent,
    AboutUsComponent,
    BlogComponent,
    ProductDetailsComponent,
    CartComponent,
    ProjectListComponent,
    SearchListComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    NgxPageScrollCoreModule.forRoot({ duration: 500 }),
    RouterModule.forChild(LayoutRoutes),
  ],
  providers: [
    { 
      provide: MatDialogRef,
      useValue: []
       }, 
      { 
      provide: MAT_DIALOG_DATA, 
      useValue: [] 
      },CookieService
  ]
})
export class LayoutModule { }
