import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { AppRoutes } from './app.routing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFileUploadModule }      from 'angular-material-fileupload';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { SwiperModule } from 'swiper/angular';

import { AppComponent }             from './app.component';
import { LayoutComponent }          from './layout/layout.component';
import { HeaderComponent }          from './common/header/header.component';
import { HeaderModule }             from './common/header/header.module';
import { FooterComponent }          from './common/footer/footer.component';
import { TermsConditionComponent }  from './home/popups/terms-condition/terms-condition.component';
import { PrivacyComponent }         from './home/popups/privacy/privacy.component';
import { ContactUsComponent }       from './home/popups/contact-us/contact-us.component';
import { RegisterComponent }        from './login/register/register.component';
import { ChangePasswordComponent }  from './home/popups/change-password/change-password.component';
import { RefundCancelComponent }    from './home/popups/refund-cancel/refund-cancel.component';
import { WishListComponent } from './home/wish-list/wish-list.component';
import { CategoryDetailComponent } from './home/category-detail/category-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TermsConditionComponent,
    PrivacyComponent,
    ContactUsComponent,
    RegisterComponent,
    HeaderComponent,
    ChangePasswordComponent,
    FooterComponent,
    RefundCancelComponent,
    WishListComponent,
    CategoryDetailComponent
  ],
  entryComponents:[
    TermsConditionComponent,
    PrivacyComponent,
    ContactUsComponent,
    ChangePasswordComponent,
    RefundCancelComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    MatFileUploadModule,
    AngularMaterialModule,
    SwiperModule,
    NgxPageScrollCoreModule.forRoot({ duration: 500 }),
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
    { 
      provide: MatDialogRef,
      useValue: []
       }, 
      { 
      provide: MAT_DIALOG_DATA, 
      useValue: [] 
      },
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '697919762318-gh43ci9ou5tol86njho8t1vgqljd45uf.apps.googleusercontent.com'
              )
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('385290912552839')
            }
          ]
        } as SocialAuthServiceConfig,
      },CookieService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
