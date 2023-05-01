import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { HttpService } from 'src/app/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { paytm } from 'src/constants';
import { MatCheckboxChange } from '@angular/material/checkbox';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  @ViewChild('payPalFormCart') payPalFormEl: any;
  @ViewChild('payTmFormCart') payTmFormEl: any;

  carData               :'';
  i                     : any = [];
  paymentForm           : FormGroup;
  payPal_form           : '';
  paytm_form            : '';
  orderId               : string;
  mid                   : string;
  custId                : string;
  industryTypeId        : string;
  channelId             : string;
  txnAmount             : string;
  website               : string;
  callBackUrl           : any;
  actorId               : any;
  mobile                : string;
  formData              : any;
  checkSumHash          : string;
  checkOrderId          : string;
  responseData          : any = [];
  newData               : any = [];
  checkSum              : any = [];
  pinCodePattern        = "^[0-9]{6,12}$";

  billAdressOne         = new FormControl('', [Validators.required]);
  billAdressTwo         = new FormControl('', [Validators.required]);
  billAdressCity        = new FormControl('', [Validators.required]);
  billAdressState       = new FormControl('', [Validators.required]);
  billAdressPCode       = new FormControl('', [Validators.required,Validators.pattern(this.pinCodePattern)]);
  shipAdressOne         = new FormControl('', [Validators.required]);
  shipAdressTwo         = new FormControl('', [Validators.required]);
  shipAdressCity        = new FormControl('', [Validators.required]);
  shipAdressState       = new FormControl('', [Validators.required]);
  shipAdressPCode       = new FormControl('', [Validators.required,Validators.pattern(this.pinCodePattern)]);
  userGST               = new FormControl('');
  sameFields            :boolean = false;
  addrsDetails          :any = [];
  checkOutAmount        :number = 0;
  gstAmount             :number = 0;
  stateList             :any = [];
  postLink              :string = '';
  paytmParams           :any=[];
  public adressForm     : FormGroup = new FormGroup({
    billAdressOne       :this.billAdressOne,
    billAdressTwo       :this.billAdressTwo,
    billAdressCity      :this.billAdressCity,
    billAdressState     :this.billAdressState,
    billAdressPCode     :this.billAdressPCode,
    userGST             :this.userGST,
    shipAdressOne       :this.shipAdressOne,
    shipAdressTwo       :this.shipAdressTwo,
    shipAdressCity      :this.shipAdressCity,
    shipAdressState     :this.shipAdressState,
    shipAdressPCode     :this.shipAdressPCode
  });

  constructor(public data:SharedDataService,
              private api:HttpService,
              public router     :Router,
              private route:ActivatedRoute,) { }

  ngOnInit(): void {
    if (!this.data.loginFlag) {
      this.router.navigate(['/']);
      return;
    }
    this.data.loadingClass = 'loadBG d-block';
    this.data.checkCartData(); //cart
      // this.cartDetails = this.data.cartData;
    // this.data.checkState();
      this.data.loadingClass = 'loadBG d-none';

    // }
    this.initializePaytmVars();

    this.checkOrderId = localStorage.getItem('orderIdMarket');
    if(this.checkOrderId) {
      this.checkPayPalOrderStatus(this.checkOrderId);
    }

    this.api.get('FETCH_STATE_DETAILS').subscribe(res => { // Get state details
      // this.stateList = res.response;
      this.stateList = JSON.parse(res.response);
      console.log(this.stateList[0].name);
      
    });
  }

  initializePaytmVars() {
    this.mid            = paytm.PAYTM_MERCHANT_MID;
    this.industryTypeId = paytm.INDUSTRY_TYPE_ID;
    this.channelId      = paytm.CHANNEL_ID;
    this.website        = paytm.PAYTM_MERCHANT_WEBSITE;
    this.callBackUrl    = paytm.TEMP_RESP;
    this.paytm_form     = '';
    this.actorId        = 97;
    this.orderId        = '';
  }

  validateFormFields() {
    if (this.billAdressCity.hasError('required') || this.billAdressOne.hasError('required') || this.billAdressState.hasError('required') || this.billAdressTwo.hasError('required') || this.shipAdressCity.hasError('required') || this.shipAdressOne.hasError('required') || this.shipAdressState.hasError('required') || this.shipAdressTwo.hasError('required')) {
      return 'Mandatory field';
    } else
      return '';
  }

  pinCodeValidator() {
    if (this.billAdressPCode.hasError('required') || this.shipAdressPCode.hasError('required'))
      return 'Please enter your Pincode';
    else if (this.billAdressPCode.hasError('pattern') || this.shipAdressPCode.hasError('pattern'))
      return 'Please enter valid Pincode';
    else
      return '';
  }

  addSameFields(event:MatCheckboxChange): void {
    if(event.checked){
      this.shipAdressOne.reset(this.billAdressOne.value);
      this.shipAdressTwo.reset(this.billAdressTwo.value);
      this.shipAdressCity.reset(this.billAdressCity.value);
      this.shipAdressState.reset(this.billAdressState.value);
      this.shipAdressPCode.reset(this.billAdressPCode.value);
    }
    $("#address_cart_pup").modal("show");
  }

  buyProduct() {
    this.data.loadingClass = 'loadBG d-block';
    this.api.post('FETCH_PRODUCT_ADDRESS_DETAILS',{userId:this.data.uID}).subscribe(res => { // to get adress details
      this.data.loadingClass = 'loadBG d-none';
      //console.log(res);
      $("#address_cart_pup").modal("show");
      if (res.responseCode == 200){
        this.billAdressOne.reset(res.response[0].billingAddressLine1)
        this.billAdressTwo.reset(res.response[0].billingAddressLine2)
        this.billAdressCity.reset(res.response[0].billingCityName)
        this.billAdressState.reset(res.response[0].billingStateName)
        this.billAdressPCode.reset(res.response[0].billingPostalCode)
        this.shipAdressOne.reset(res.response[0].shippingAddressLine1)
        this.shipAdressTwo.reset(res.response[0].shippingAddressLine2)
        this.shipAdressCity.reset(res.response[0].shippingCityName)
        this.shipAdressState.reset(res.response[0].shippingStateName)
        this.shipAdressPCode.reset(res.response[0].shippingPostalCode)
      }
    });
  }

  setAdress(){
    this.data.loadingClass = 'loadBG d-block';
   
    let formData = {
      userId                :this.data.uID,
      billingAddressLine1   :this.billAdressOne.value,
      billingAddressLine2   :this.billAdressTwo.value,
      billingCityName       :this.billAdressCity.value,
      billingStateName      :this.billAdressState.value,
      billingPostalCode     :this.billAdressPCode.value,
      GstNumber             :this.userGST.value,
      shippingAddressLine1  :this.shipAdressOne.value,
      shippingAddressLine2  :this.shipAdressTwo.value,
      shippingCityName      :this.shipAdressCity.value,
      shippingStateName     :this.shipAdressState.value,
      shippingPostalCode    :this.shipAdressPCode.value,
      productId             :this.data.carData
    }

    this.api.post('SET_PRODUCT_ADDRESS_DETAILS',formData).subscribe(res => { // to set adress details
      // this.data.loadingClass = 'loadBG d-none';
      // console.log(res);
      $("#address_cart_pup").modal("hide");
      this.goForPayment();
    });
  }

  goForPayment() {
    this.data.loadingClass = 'loadBG d-block';
       //console.log(this.data);
       
      
        
    this.api.post('FETCH_PAYPAL_CART_ORDER_ID',{cardData:this.data.carData,websiteIdentifier:0}).subscribe(res => { // Post call to get orderID
        this.newData = res;
        
    
        if (this.newData.responseCode == 200) {
          // this.data.firePopup(true,'Event Joined');
          // this.data.loadingClass = 'loadBG d-none';
     
          this.data.loadingClass = 'loadBG d-none';
          this.gstAmount = Number(this.data.total) - (Number(this.data.total) * (100/(100+18)));
          this.checkOutAmount = Number(this.data.total) - this.gstAmount;
          this.postLink = this.newData.response.link
          this.api.post('FETCH_PRODUCT_ADDRESS_DETAILS',{userId:this.data.uID}).subscribe(res => { // to get adress details
            $("#address_cart_show_pup").modal("show");
            this.data.loadingClass = 'loadBG d-none';
          
            this.addrsDetails = res.response[0];
          });

        } else if (this.newData.responseCode == 824) {
          // this.data.firePopupConfirm('Are you sure?\nYou will be re-directed to Payment Gateway!');
          this.data.loadingClass = 'loadBG d-none';
          this.gstAmount = Number(this.newData.response.price) - (Number(this.newData.response.price) * (100/(100+18)));
          this.checkOutAmount = Number(this.newData.response.price) - this.gstAmount;
          this.postLink = this.newData.response.link
          this.api.post('FETCH_PRODUCT_ADDRESS_DETAILS',{userId:this.data.uID}).subscribe(res => { // to get adress details
            $("#address_cart_show_pup").modal("show");
            this.data.loadingClass = 'loadBG d-none';
            this.addrsDetails = res.response[0];
          });
        }
    });
  }

  payNow(gate:string){
    $("#address_sku_show_pup").modal("hide");
    this.data.loadingClass = 'loadBG d-block';
    this.data.firePopupConfirm('Redirecting to Payment Gateway! Please wait..');
    localStorage.setItem('orderIdMarket',this.newData.response.orderId);
    
    if (gate == 'payTm'){
      this.generateCheckSumHash();
    }
   
     if (gate == 'payPal'){
      this.loadPayPalForm();
     }
     
  }

  generateCheckSumHash() {
    var formData = {
      orderId:this.newData.response.orderId,
      cust_id:this.data.identifier,
      emailId:this.data.emailId,
      mobileNo:this.data.mobileNo,
      amount:this.data.total
      //amount:this.checkOutAmount
    }


    this.api.post('FETCH_PRODUCT_CHECKSUM_HASH',formData).subscribe(res => {
      this.checkSum = res;
      this.checkSumHash = this.checkSum.response;
    //  this.paytmParams= this.checkSum.paytmParams;
        //  console.log(this.checkSum.response );
      this.loadPaytmForm();
    });
  }


  loadPayPalForm() {
    setTimeout(() =>{this.submitPayPalForm();},500);
  }
  submitPayPalForm() {
    setTimeout(() =>{this.payPalFormEl.nativeElement.submit();},500);
  }

  loadPaytmForm() {
    
 
    this.orderId = this.newData.response.orderId;
    setTimeout(() =>{this.submitPaytmForm();},500);
    this.txnAmount = this.newData.response.price;
  }
  submitPaytmForm() {
    setTimeout(() =>{this.payTmFormEl.nativeElement.submit();},500);
  }

  checkPayPalOrderStatus(response:any) {
    this.data.loadingClass = 'loadBG d-block';
    this.api.post('FETCH_MARKET_TRANSACTION_STATUS',{orderId:response}).subscribe(res => { // Check transaction status
      this.data.loadingClass = 'loadBG d-none';
      if (res.responseCode == 200){ 
        
        this.data.carData.forEach((CartData: any) => {
          console.log(CartData.productId);
          this.data.cartemptyafterorder(CartData.productId);
        });

        this.data.firePopup(true,'Transaction Successfull! Order Id :' + response);
        
        setTimeout(()=>{this.router.navigate(['/profile']);},3000);
        
      } else {
        this.data.firePopup(false,res.responseMsg);
      }
    });
    localStorage.removeItem('orderIdMarket');
  }




  // checkPayPalOrderStatus(response:any) {
  //   this.data.loadingClass = 'loadBG d-block';
  //   this.api.post('FETCH_MARKET_TRANSACTION_STATUS',{orderId:response}).subscribe(res => { // Check transaction status
  //     this.data.loadingClass = 'loadBG d-none';
  //     if (res.responseCode == 200){
  //       this.data.firePopup(true,'Transaction Successfull! Order Id :' + response);
  //     } else {
  //       this.data.firePopup(false,res.responseMsg);
  //     }
  //   });
  //   localStorage.removeItem('orderIdMarket');
  // }
}
