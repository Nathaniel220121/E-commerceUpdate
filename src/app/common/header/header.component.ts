import {  HostListener,Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog,} from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/http/http.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  fixedClass = '';
  erroMessage: string = '';
  popupClass: string;
  loginForm1: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;
  sigOutFlag: boolean = false;
  registerScreen: boolean = false;
  emailEntered: boolean = true;
  hide = true;
  loginSuccessData:any = [];
  forgotData:any = [];
  headerDetails:any = [];
  emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  emailID = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]);
  password = new FormControl('', [Validators.required]);
  searchText = new FormControl('');
  remember = new FormControl(false);
  forEmailID = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]);
  activeSection: number;
  productList:any = [];



  public loginForm: FormGroup = new FormGroup({
    email: this.emailID,
    mobileNo:this.password
  });

  constructor(private http: HttpClient,
    public router: Router,
    public data:SharedDataService,
    private socialAuthService: SocialAuthService,
    public dialog: MatDialog,
    public  api   :HttpService,
    private cookieService: CookieService,
    private viewportScroller:ViewportScroller
  ) { }

  @HostListener('window:scroll', ['$event']) onScrollEvent(){
    if (window.scrollY > 550) {
      this.fixedClass = 'fixed-top';
    } else {
      this.fixedClass = '';
    }
  }

  ngOnInit(): void {

    this.data.aboutClicked = false;
    this.popupClass = "popupHead img-fluid d-none";

    if (this.cookieService.get('remember') == 'true') {
      this.emailID.reset(this.cookieService.get('userID'));
      this.password.reset(this.cookieService.get('passWord'));
      this.remember.reset(true);
    
    } else {
      this.emailID.reset('');
      this.password.reset('');
      this.remember.reset(false);
      
    }

    // this.api.get('FETCH_PRODUCT_NAME').subscribe(res => { //Get Product details
    //   this.productList = res.response;
    // });

  }

  public scrollAuto(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  aboutNavigate() {
    window.location.href ="/#aboutUs"
    if(!this.data.aboutClicked){
      this.data.aboutClicked = true;
      //console.log('1');
      this.aboutNavigate();
    }
  }

  passwordVerify() {
    if (this.password.hasError('required'))

      return 'Please enter your password';
  }

  emailValidate() {
 
    if (this.emailID.hasError('required') ) {
      
      this.emailEntered = true;
      return 'Please enter your Email ID';
    }  else if (this.emailID.hasError('email') ) {
      this.emailEntered = true;
      return 'Not a valid email';
    } else if(this.emailID.hasError('pattern'))
    return 'Not a valid email'
    else{
      this.emailEntered = false;
    }
  }

  emailValidate2() {
    if (this.forEmailID.hasError('required') ) {
     
      return 'Please enter your Email ID';
    }  else if (this.forEmailID.hasError('email') ) {
      return 'Not a valid email';
    }
      else if(this.emailID.hasError('pattern'))
        return 'Not a valid email'
  }


  
  logCheck(){
    
    this.data.loadingClass = 'loadBG d-block';
    var loginData = {
      emailId:this.emailID.value,
      password:this.password.value
    }

    this.http.post(''+this.data.apiDomainPath+'login',loginData,{ headers: {'url-Name':'ecommerce'} })
    .subscribe(data => {
      this.loginSuccessData = data;
      if(this.loginSuccessData.responseCode == "200"){
        // if(this.loginSuccessData.response.userData[0].roles == 'Jury'){
          this.data.loggedUser(this.loginSuccessData.response.userData[0]);
          if(this.loginSuccessData.response.userData[0].autoGeneratePassword == '1'){
            this.router.navigate(['/profile/']);
          } else{
            this.router.navigate(['//']);
          }
          $("#login_pup").modal("hide");
          this.cookieService.set('userID', this.emailID.value);
          this.cookieService.set('passWord', this.password.value);
          if(this.cookieService.get('remember') == 'true'){
            this.emailID.reset(this.cookieService.get('userID'));
            this.password.reset(this.cookieService.get('passWord'));
            this.remember.reset(true);
          } else{
            this.emailID.reset('');
            this.password.reset('');
            this.remember.reset(false);
          }
          this.data.loadingClass = 'loadBG d-none';
      //   } else{
      //   this.data.loadingClass = 'loadBG d-none';
      //   this.data.firePopup(false,'This account is not registered as Jury');
      // }
      }else if(this.loginSuccessData.responseCode == "805"){
        this.data.firePopup(false,'Password Missmatch');
        this.data.loadingClass = 'loadBG d-none';
      }else if(this.loginSuccessData.responseCode == "804"){
        this.data.firePopup(false,this.loginSuccessData.responseMsg);
        this.data.loadingClass = 'loadBG d-none';
      } else{
        this.data.firePopup(false,this.loginSuccessData.responseMsg);
        this.data.loadingClass = 'loadBG d-none';
      }
    },
    err => {
        this.data.loadingClass = 'loadBG d-none';
        this.data.firePopup(false,err.error.message);
    });
  }

  openForgotPass(){
    $("#login_pup").modal("hide");
    $("#forgot_pup").modal("show");
  }

  forgotPaswd(){
    this.data.loadingClass = 'loadBG d-block';

    var forgotData =  {
      emailId:this.forEmailID.value,
    }

    // this.data.loadingClass = 'loadBG d-block';
    this.http.post(''+this.data.apiDomainPath+'forgetPassword',forgotData,{ headers: {'url-Name':'ecommerce'} })
    .subscribe(data => {
      // console.log(data);
      this.forgotData = data;
      this.data.loadingClass = 'loadBG d-none';
      if(this.forgotData.responseCode == "200"){
        $("#forgot_pup").modal("hide");
        this.forEmailID.reset('');
        this.data.firePopup(true,'Password sent to your E-mail ID.');
      } else{
        this.data.firePopup(false,this.forgotData.responseMsg);
      }
    },
    err => {
      this.data.loadingClass = 'loadBG d-none';;
      this.data.firePopup(false,err.error.message);
    });
  }

  closePopImage(){
    this.popupClass = "popupHead img-fluid d-none";
  }

  openRegister(){
    this.data.registerPage = true;
    $("#login_pup").modal("hide");
    this.router.navigate(['/register/']);
  }

  rememberFunc(){
    this.cookieService.set('remember',this.remember.value);
  }
}
