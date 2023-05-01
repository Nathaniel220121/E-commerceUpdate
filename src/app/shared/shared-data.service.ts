import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpService } from '../http/http.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject,Observable, BehaviorSubject } from 'rxjs';
import { ProductDetailsComponent } from '../home/product-details/product-details.component';

// import { RegisterComponent } from 'src/app/login/register/register.component';
declare var $: any;

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class SharedDataService{

  get nativeWindow() : any {
    return _window();
  }
  socialUser        :any = [];
  isLoggedin        :boolean;
  sEmailId          :string;
  sFirstName        :string;
  sLastName         :string;
  loadingClass      :string = 'loadBG d-none'
  loginFlag         :boolean = false;
  registerPage      :boolean = false;
  pageName          :string = 'home';
  public readonly apiDomainPath:string = 'https://api.themafic.com/api/Mafic/';
  public readonly apiDomainPathDash:string = 'https://api.themafic.com/api/MaficDashboard/';
  loggedUserData    :any;
  socialLogin       :boolean = false;
  public readonly dummyProfilePic:string  = '../../assets/images/blank-profile-picture.png'
  profileUrl        :string = 'http://ec2-13-234-17-220.ap-south-1.compute.amazonaws.com/uploads/images/1224986385.art-four.png';
  firstName         :string = '';
  lastName          :string = '';
  mobileNo          :string = '';
  mobileNoCode      :string = '';
  moduleAccess      :string = '';
  roles             :string = '';
  uID               :number = 0;
  identifier        :string=''
  interestCategory  :string='';
  experience        :string  = '';
  emailId           :string = '';
  cartData          :any=[];
  cartCount         :number = 0;
  rcvdCartData      :any=[];
  eventListDetails  :any=[];
  galleryDetails    :any=[];
  emailVerified     :string;
  loginSuccessData  :any = [];
  autoGenerate      :string = '0';
  logingIn          :boolean = false;
  accesData         :boolean = false;
  singningOut       :boolean = false;
  popupClass        :string ='overlay d-none';
  popupClassConfirm :string ='overlay d-none';
  popupState        :boolean = false;
  popupText         :string ='';
  aboutClicked      = false;
  likeData          :any = [];
  imageLiked        :boolean = true;
  likeGalCount      :any = [];
  logoDetails       :any = [];
  logoImgUrl        :any = [];
  bannerImageDetails:any = [];
  bannerImageImgUrl :any = [];
  carData           :any = [];
  wishData          :any = [];
  stateListArray    :any = [];
  allCategoryData   :any = [];
  miniCartData      :any = [];
  totalPrice        :number = 0;
  totalDiscount     :number = 0;
  total             :number = 0;
  searchProductList :any = [];
  private customSubject = new Subject<any>();
  private payMentObject = new Subject<any>();
  customObservable  = this.customSubject.asObservable();
  paymentObservable  = this.payMentObject.asObservable();

  cartItemQuantity : number = 1;
  // Service message commands
  callComponentMethod() {
    this.customSubject.next();
  }

  // Call payment func
  callPaymentMethod() {
    this.payMentObject.next();
  }

  getClickEvent(): Observable<any>{
    return this.payMentObject.asObservable();
  }

  constructor(private router            :Router,
              public  socialAuthService :SocialAuthService,
              private cookieService     :CookieService,
              private http              :HttpClient,
              private api               :HttpService,
             // public product_detail     :ProductDetailsComponent
              ) {

      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.loadingClass = 'loadBG d-block';
        if (this.logingIn) {
          this.logingIn = false;
          this.isLoggedin = (user != null);
          console.log(this.socialUser.email);
          this.api.post('FETCH_SOCIAL_LOGIN_DETAILS',{emailId:this.socialUser.email}).subscribe(res => {  //Check socail login
            this.loginSuccessData = res;
            if (this.loginSuccessData.responseCode == "200") {
              this.loggedUser(this.loginSuccessData.response.userData[0]);
              this.router.navigate(['//']);
              $("#login_pup").modal("hide");
              this.cookieService.set('userID', '');
              this.cookieService.set('passWord', '');
              console.log(this.cookieService.get('userID'));
              this.loadingClass = 'loadBG d-none';
            } else if (this.loginSuccessData.responseCode == "805") {
              this.firePopup(false,'Password Missmatch');
              this.loadingClass = 'loadBG d-none';
            } else{
              this.firePopup(false,this.loginSuccessData.responseMsg);
              this.loadingClass = 'loadBG d-none';
            }
          });
        } else if (this.singningOut) {
          this.singningOut = false;
          this.loadingClass = 'loadBG d-none';

        } else if (this.accesData) {
          this.loadingClass = 'loadBG d-none';
          console.log("accesData");
          this.accesData = false;

          this.sEmailId = this.socialUser.email;
          this.sFirstName = this.socialUser.firstName;
          this.sLastName = this.socialUser.lastName;
          this.callComponentMethod();
          // this.reg.details();
        } else{
          console.log('Last');
        }
      });

      this.api.get('FETCH_MAFIC_LOGO').subscribe(res => { // Get Logo details
        this.logoDetails = res;
        this.logoImgUrl = this.logoDetails.response[0].image;
      });

      this.api.get('FETCH_HEADER_IMAGES').subscribe(res => { // Get image details
        this.bannerImageDetails = res;
        this.bannerImageImgUrl = this.bannerImageDetails.response[0].image1;
      });
    }

  loginWithFacebook(): void {
    this.logingIn = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.logingIn = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOutAll(): void {
    localStorage.loggedUserDataCommunity = {};
    this.loginFlag = false;
    if (this.isLoggedin) {
      this.singningOut = true;
      this.socialAuthService.signOut();
    }
    this.router.navigate(['//'])
    this.firePopup(true,'You have been logged out');
  }

  loggedUser(data:any) {
    localStorage.loggedUserDataCommunity = JSON.stringify(data);
    if (localStorage.loggedUserDataCommunity != '{}') {
      this.loggedUserData = data;
      this.storeUserData(this.loggedUserData);
    }
    console.log(data);
  }

  storeUserData(refreshData:any) {
    this.loginFlag = true;
    this.profileUrl = refreshData.profileUrl;
    this.firstName = refreshData.firstName;
    this.lastName = refreshData.lastName;
    this.mobileNo = refreshData.countryCode;
    this.mobileNo = this.mobileNo.concat(' '+refreshData.mobileNo);
    // this.mobileNoCode = refreshData.countryCode;
    this.emailId = refreshData.emailId;
    this.moduleAccess = refreshData.moduleAccess;
    this.interestCategory  = refreshData.interestCat;
    this.experience = refreshData.experience;
    this.roles = refreshData.roles;
    this.uID = refreshData.id;
    this.emailVerified  = refreshData.emailVerify;
    this.identifier  = refreshData.identifier;
    this.autoGenerate = refreshData.autoGeneratePassword;
    if (this.loginFlag && this.autoGenerate == '1') {
      this.router.navigate(['/profile/']);
    }
    if (this.profileUrl == null)
      this.profileUrl = this.dummyProfilePic;
  }

  changeUserData(data:any) {
    localStorage.loggedUserDataCommunity = JSON.stringify(data.response);
    // if (data.response.profileURL != undefined)
      this.loggedUserData = data.response;
    // this.loggedUserData.firstName = data.response.firstName;
    // this.loggedUserData.lastName = data.response.lastName;
    // this.loggedUserData.interesrCat = data.response.interesrCat;
    // this.loggedUserData.experience = data.response.experience;
    let dataChanged = JSON.parse(localStorage.loggedUserDataCommunity);
    dataChanged = this.loggedUserData;
    localStorage.loggedUserDataCommunity = JSON.stringify(dataChanged);
    this.storeUserData(this.loggedUserData);
  }

  firePopup(state:boolean,text:string) {
    this.popupState = state;
    this.popupText = text;
    this.popupClass ='overlay d-block cut_pup';
  }

  firePopupConfirm(text:string) {
    this.popupText = text;
    this.popupClassConfirm ='overlay d-block cut_pup';
  }

  proceedToPay() {
    this.popupClassConfirm ='overlay d-none';
    this.callPaymentMethod();
  }

  fireClose() {
    this.popupClassConfirm ='overlay d-none';
    this.popupClass ='overlay d-none';
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    formData.append('emailId', this.emailId);
    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    formData.append('experience', this.experience);
    formData.append('interestCat', this.interestCategory);
    const req = new HttpRequest('POST', `${this.apiDomainPath}editProfile`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  uploadEventImage(file: File,eventId:any,artName:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    formData.append('userId', String(this.uID));
    formData.append('eventId', eventId);
    formData.append('artName',artName);
    const req = new HttpRequest('POST', `${this.apiDomainPath}insertContestEntries`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiDomainPath}/files`);
  }

  checkCartData() {
    //this.cartItemQuantity = this.product_detail.counter;
    //console.log("cart item quantity--"+ this.cartItemQuantity+"--"+"counetr"+this.product_detail.counter);
    this.api.post('FETCH_MARKET_DETAILS_OF_CART',{userId:this.uID,qty:this.cartItemQuantity}).subscribe(res => { // Get image details
      this.carData = res.response;
      this.totalPrice = 0;
      this.totalDiscount = 0;
      this.total = 0;
      for (let index = 0; index < this.carData.length; index++) {
        console.log("Index"+index+"Quantity-->"+ this.carData[index].qty + "Price-->"+this.carData[index].price);
        this.totalPrice += Number(this.carData[index].qty) * Number(this.carData[index].price);
        this.totalDiscount += Number(this.carData[index].qty) * (Number(this.carData[index].discount) * Number(this.carData[index].price))/100.0;
        if(index<2)
          this.miniCartData[index] = this.carData[index]
      }
      this.totalDiscount = Math.round(this.totalDiscount);
      this.total = Number(this.totalPrice) - Number(this.totalDiscount);
    });
  }

  addToCart(pId:any){
    if (this.loginFlag) {
      this.loadingClass = 'loadBG d-block';
      this.api.post('SET_MARKET_DETAILS_TO_CART',{userId:this.uID,productId:pId,qty:this.cartItemQuantity}).subscribe(res => { //Add to cart
        this.loadingClass = 'loadBG d-none';
        if(res.responseCode == 200) {
          console.log("Quantity of each item "+this.cartItemQuantity);
          this.firePopup(true,'Product Added to Cart');
        } else {
          this.firePopup(false,res.responseMsg);
        }
        this.totalPrice = 0;
        this.totalDiscount =0;
        // this.checkCartData();
      });
    } else {
      $("#login_pup").modal("show");
    }
  }

  addWishList(pId:any) {
    if (this.loginFlag) {
      this.loadingClass = 'loadBG d-block';
      this.api.post('SET_MARKET_DETAILS_TO_WISHLIST',{userId:this.uID,productId:pId}).subscribe(res => { //Add to cart
        this.loadingClass = 'loadBG d-none';
        if(res.responseCode == 200) {
          this.firePopup(true,'Product Added to Wishlist');
        } else {
          this.firePopup(false,res.responseMsg);
        }
        this.totalPrice = 0;
        this.totalDiscount =0;
      // this.checkCartData();
      });
      
    } else {
      $("#login_pup").modal("show");
    }
  }

  checkWishListData() {
    this.api.post('FETCH_MARKET_DETAILS_OF_WISHLIST',{userId:this.uID}).subscribe(res => { // Get image details
      this.wishData = res.response;
    });
  }



  removeItemFromCart(pId:any) {
    this.loadingClass = 'loadBG d-block';
    this.api.post('DELETE_FROM_CART',{userId:this.uID,productId:pId}).subscribe(res => { // Get image details
      this.loadingClass = 'loadBG d-none';
      if(res.responseCode == 200) {
         this.firePopup(true,'Product removed from the cart successfully');
         this.totalPrice = 0;
         this.totalDiscount = 0;
         this.checkCartData();
      } else {
        this.firePopup(false,res.responseMsg);
      }
    });

  }

  removeItemFromWishlist(pId:any) {
    this.loadingClass = 'loadBG d-block';
    this.api.post('DELETE_FROM_WISHLIST',{userId:this.uID,productId:pId}).subscribe(res => { // Get image details
      this.loadingClass = 'loadBG d-none';
      if(res.responseCode == 200) {
        this.firePopup(true,'Product removed from the wishlist successfully');
        this.checkWishListData();
      } else {
        this.firePopup(false,res.responseMsg);
      }
    });
  }

  checkState() {
    this.api.get('FETCH_STATE_DETAILS').subscribe(res => { //Get Category details
      this.stateListArray = JSON.parse(res.response)
      // console.log(this.stateListArray);
    });
  }


  //api for incrementing the product count
  increment(pId:any) {
    this.api.post('INCREMENT_CART_ITEM',{userId:this.uID,productId:pId}).subscribe(res => { //Add to cart
      this.loadingClass = 'loadBG d-none';
      if(res.responseCode == 200) {
        if(pId.qty > 0 && pId.qty <=4){
          pId.qty++;
        } else if(pId.qty == 0) {
          pId.qty =1;
        }
      } else {
        this.firePopup(false,res.responseMsg);
      }
      //pId.qty = this.cartItemQuantity;
      this.totalPrice = 0;
      this.totalDiscount =0;
       this.checkCartData();
    });
  }
 //api for decrementing the product count
  decrement(pId:any) {
    this.api.post('DECREMENT_CART_ITEM',{userId:this.uID,productId:pId}).subscribe(res => { //Add to cart
      this.loadingClass = 'loadBG d-none';
      if(res.responseCode == 200) {
        if(pId.qty >= 2 ){
           pId.qty--;
        } else if(pId.qty == 0) {
          pId.qty =1;
        }
      } else {
        this.firePopup(false,res.responseMsg);
      }
      this.totalPrice = 0;
      this.totalDiscount =0;
       this.checkCartData();
    });
  }

  searchResult(searchVal:any) {
    this.loadingClass = 'loadBG d-block';
    this.api.post('SEARCH_ITEM',{search:searchVal}).subscribe(res => { // Get image details    
    this.loadingClass = 'loadBG d-none';
      if (res.responseCode == 200) {
        this.searchProductList = res.response;
        this.router.navigate(['/products-list']);
      } else {
        this.firePopup(false,'No result found');
      }
    });
  }


  cartemptyafterorder(pId:any) {
    this.loadingClass = 'loadBG d-block';
    this.api.post('DELETE_FROM_CART',{userId:this.uID,productId:pId}).subscribe(res => { // Get image details
      this.loadingClass = 'loadBG d-none';
      if(res.responseCode == 200) {
        
         this.totalPrice = 0;
         this.totalDiscount = 0;
         this.checkCartData();
      } else {
         
      }
    });

  }

}

