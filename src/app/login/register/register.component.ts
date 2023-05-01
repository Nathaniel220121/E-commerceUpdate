import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ViewEncapsulation } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {TooltipPosition} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
declare var google: any;

export interface ICountryAndCode {
  code: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  countries: ICountryAndCode[] = [
    {
      "code": "+7 840",
      "name": "Abkhazia"
    },
    {
      "code": "+93",
      "name": "Afghanistan"
    },
    {
      "code": "+355",
      "name": "Albania"
    },
    {
      "code": "+213",
      "name": "Algeria"
    },
    {
      "code": "+1 684",
      "name": "American Samoa"
    },
    {
      "code": "+376",
      "name": "Andorra"
    },
    {
      "code": "+244",
      "name": "Angola"
    },
    {
      "code": "+1 264",
      "name": "Anguilla"
    },
    {
      "code": "+1 268",
      "name": "Antigua and Barbuda"
    },
    {
      "code": "+54",
      "name": "Argentina"
    },
    {
      "code": "+374",
      "name": "Armenia"
    },
    {
      "code": "+297",
      "name": "Aruba"
    },
    {
      "code": "+247",
      "name": "Ascension"
    },
    {
      "code": "+61",
      "name": "Australia"
    },
    {
      "code": "+672",
      "name": "Australian External Territories"
    },
    {
      "code": "+43",
      "name": "Austria"
    },
    {
      "code": "+994",
      "name": "Azerbaijan"
    },
    {
      "code": "+1 242",
      "name": "Bahamas"
    },
    {
      "code": "+973",
      "name": "Bahrain"
    },
    {
      "code": "+880",
      "name": "Bangladesh"
    },
    {
      "code": "+1 246",
      "name": "Barbados"
    },
    {
      "code": "+1 268",
      "name": "Barbuda"
    },
    {
      "code": "+375",
      "name": "Belarus"
    },
    {
      "code": "+32",
      "name": "Belgium"
    },
    {
      "code": "+501",
      "name": "Belize"
    },
    {
      "code": "+229",
      "name": "Benin"
    },
    {
      "code": "+1 441",
      "name": "Bermuda"
    },
    {
      "code": "+975",
      "name": "Bhutan"
    },
    {
      "code": "+591",
      "name": "Bolivia"
    },
    {
      "code": "+387",
      "name": "Bosnia and Herzegovina"
    },
    {
      "code": "+267",
      "name": "Botswana"
    },
    {
      "code": "+55",
      "name": "Brazil"
    },
    {
      "code": "+246",
      "name": "British Indian Ocean Territory"
    },
    {
      "code": "+1 284",
      "name": "British Virgin Islands"
    },
    {
      "code": "+673",
      "name": "Brunei"
    },
    {
      "code": "+359",
      "name": "Bulgaria"
    },
    {
      "code": "+226",
      "name": "Burkina Faso"
    },
    {
      "code": "+257",
      "name": "Burundi"
    },
    {
      "code": "+855",
      "name": "Cambodia"
    },
    {
      "code": "+237",
      "name": "Cameroon"
    },
    {
      "code": "+1",
      "name": "Canada"
    },
    {
      "code": "+238",
      "name": "Cape Verde"
    },
    {
      "code": "+ 345",
      "name": "Cayman Islands"
    },
    {
      "code": "+236",
      "name": "Central African Republic"
    },
    {
      "code": "+235",
      "name": "Chad"
    },
    {
      "code": "+56",
      "name": "Chile"
    },
    {
      "code": "+86",
      "name": "China"
    },
    {
      "code": "+61",
      "name": "Christmas Island"
    },
    {
      "code": "+61",
      "name": "Cocos-Keeling Islands"
    },
    {
      "code": "+57",
      "name": "Colombia"
    },
    {
      "code": "+269",
      "name": "Comoros"
    },
    {
      "code": "+242",
      "name": "Congo"
    },
    {
      "code": "+243",
      "name": "Congo, Dem. Rep. of (Zaire)"
    },
    {
      "code": "+682",
      "name": "Cook Islands"
    },
    {
      "code": "+506",
      "name": "Costa Rica"
    },
    {
      "code": "+385",
      "name": "Croatia"
    },
    {
      "code": "+53",
      "name": "Cuba"
    },
    {
      "code": "+599",
      "name": "Curacao"
    },
    {
      "code": "+537",
      "name": "Cyprus"
    },
    {
      "code": "+420",
      "name": "Czech Republic"
    },
    {
      "code": "+45",
      "name": "Denmark"
    },
    {
      "code": "+246",
      "name": "Diego Garcia"
    },
    {
      "code": "+253",
      "name": "Djibouti"
    },
    {
      "code": "+1 767",
      "name": "Dominica"
    },
    {
      "code": "+1 809",
      "name": "Dominican Republic"
    },
    {
      "code": "+670",
      "name": "East Timor"
    },
    {
      "code": "+56",
      "name": "Easter Island"
    },
    {
      "code": "+593",
      "name": "Ecuador"
    },
    {
      "code": "+20",
      "name": "Egypt"
    },
    {
      "code": "+503",
      "name": "El Salvador"
    },
    {
      "code": "+240",
      "name": "Equatorial Guinea"
    },
    {
      "code": "+291",
      "name": "Eritrea"
    },
    {
      "code": "+372",
      "name": "Estonia"
    },
    {
      "code": "+251",
      "name": "Ethiopia"
    },
    {
      "code": "+500",
      "name": "Falkland Islands"
    },
    {
      "code": "+298",
      "name": "Faroe Islands"
    },
    {
      "code": "+679",
      "name": "Fiji"
    },
    {
      "code": "+358",
      "name": "Finland"
    },
    {
      "code": "+33",
      "name": "France"
    },
    {
      "code": "+596",
      "name": "French Antilles"
    },
    {
      "code": "+594",
      "name": "French Guiana"
    },
    {
      "code": "+689",
      "name": "French Polynesia"
    },
    {
      "code": "+241",
      "name": "Gabon"
    },
    {
      "code": "+220",
      "name": "Gambia"
    },
    {
      "code": "+995",
      "name": "Georgia"
    },
    {
      "code": "+49",
      "name": "Germany"
    },
    {
      "code": "+233",
      "name": "Ghana"
    },
    {
      "code": "+350",
      "name": "Gibraltar"
    },
    {
      "code": "+30",
      "name": "Greece"
    },
    {
      "code": "+299",
      "name": "Greenland"
    },
    {
      "code": "+1 473",
      "name": "Grenada"
    },
    {
      "code": "+590",
      "name": "Guadeloupe"
    },
    {
      "code": "+1 671",
      "name": "Guam"
    },
    {
      "code": "+502",
      "name": "Guatemala"
    },
    {
      "code": "+224",
      "name": "Guinea"
    },
    {
      "code": "+245",
      "name": "Guinea-Bissau"
    },
    {
      "code": "+595",
      "name": "Guyana"
    },
    {
      "code": "+509",
      "name": "Haiti"
    },
    {
      "code": "+504",
      "name": "Honduras"
    },
    {
      "code": "+852",
      "name": "Hong Kong SAR China"
    },
    {
      "code": "+36",
      "name": "Hungary"
    },
    {
      "code": "+354",
      "name": "Iceland"
    },
    {
      "code": "+91",
      "name": "India"
    },
    {
      "code": "+62",
      "name": "Indonesia"
    },
    {
      "code": "+98",
      "name": "Iran"
    },
    {
      "code": "+964",
      "name": "Iraq"
    },
    {
      "code": "+353",
      "name": "Ireland"
    },
    {
      "code": "+972",
      "name": "Israel"
    },
    {
      "code": "+39",
      "name": "Italy"
    },
    {
      "code": "+225",
      "name": "Ivory Coast"
    },
    {
      "code": "+1 876",
      "name": "Jamaica"
    },
    {
      "code": "+81",
      "name": "Japan"
    },
    {
      "code": "+962",
      "name": "Jordan"
    },
    {
      "code": "+7 7",
      "name": "Kazakhstan"
    },
    {
      "code": "+254",
      "name": "Kenya"
    },
    {
      "code": "+686",
      "name": "Kiribati"
    },
    {
      "code": "+965",
      "name": "Kuwait"
    },
    {
      "code": "+996",
      "name": "Kyrgyzstan"
    },
    {
      "code": "+856",
      "name": "Laos"
    },
    {
      "code": "+371",
      "name": "Latvia"
    },
    {
      "code": "+961",
      "name": "Lebanon"
    },
    {
      "code": "+266",
      "name": "Lesotho"
    },
    {
      "code": "+231",
      "name": "Liberia"
    },
    {
      "code": "+218",
      "name": "Libya"
    },
    {
      "code": "+423",
      "name": "Liechtenstein"
    },
    {
      "code": "+370",
      "name": "Lithuania"
    },
    {
      "code": "+352",
      "name": "Luxembourg"
    },
    {
      "code": "+853",
      "name": "Macau SAR China"
    },
    {
      "code": "+389",
      "name": "Macedonia"
    },
    {
      "code": "+261",
      "name": "Madagascar"
    },
    {
      "code": "+265",
      "name": "Malawi"
    },
    {
      "code": "+60",
      "name": "Malaysia"
    },
    {
      "code": "+960",
      "name": "Maldives"
    },
    {
      "code": "+223",
      "name": "Mali"
    },
    {
      "code": "+356",
      "name": "Malta"
    },
    {
      "code": "+692",
      "name": "Marshall Islands"
    },
    {
      "code": "+596",
      "name": "Martinique"
    },
    {
      "code": "+222",
      "name": "Mauritania"
    },
    {
      "code": "+230",
      "name": "Mauritius"
    },
    {
      "code": "+262",
      "name": "Mayotte"
    },
    {
      "code": "+52",
      "name": "Mexico"
    },
    {
      "code": "+691",
      "name": "Micronesia"
    },
    {
      "code": "+1 808",
      "name": "Midway Island"
    },
    {
      "code": "+373",
      "name": "Moldova"
    },
    {
      "code": "+377",
      "name": "Monaco"
    },
    {
      "code": "+976",
      "name": "Mongolia"
    },
    {
      "code": "+382",
      "name": "Montenegro"
    },
    {
      "code": "+1664",
      "name": "Montserrat"
    },
    {
      "code": "+212",
      "name": "Morocco"
    },
    {
      "code": "+95",
      "name": "Myanmar"
    },
    {
      "code": "+264",
      "name": "Namibia"
    },
    {
      "code": "+674",
      "name": "Nauru"
    },
    {
      "code": "+977",
      "name": "Nepal"
    },
    {
      "code": "+31",
      "name": "Netherlands"
    },
    {
      "code": "+599",
      "name": "Netherlands Antilles"
    },
    {
      "code": "+1 869",
      "name": "Nevis"
    },
    {
      "code": "+687",
      "name": "New Caledonia"
    },
    {
      "code": "+64",
      "name": "New Zealand"
    },
    {
      "code": "+505",
      "name": "Nicaragua"
    },
    {
      "code": "+227",
      "name": "Niger"
    },
    {
      "code": "+234",
      "name": "Nigeria"
    },
    {
      "code": "+683",
      "name": "Niue"
    },
    {
      "code": "+672",
      "name": "Norfolk Island"
    },
    {
      "code": "+850",
      "name": "North Korea"
    },
    {
      "code": "+1 670",
      "name": "Northern Mariana Islands"
    },
    {
      "code": "+47",
      "name": "Norway"
    },
    {
      "code": "+968",
      "name": "Oman"
    },
    {
      "code": "+92",
      "name": "Pakistan"
    },
    {
      "code": "+680",
      "name": "Palau"
    },
    {
      "code": "+970",
      "name": "Palestinian Territory"
    },
    {
      "code": "+507",
      "name": "Panama"
    },
    {
      "code": "+675",
      "name": "Papua New Guinea"
    },
    {
      "code": "+595",
      "name": "Paraguay"
    },
    {
      "code": "+51",
      "name": "Peru"
    },
    {
      "code": "+63",
      "name": "Philippines"
    },
    {
      "code": "+48",
      "name": "Poland"
    },
    {
      "code": "+351",
      "name": "Portugal"
    },
    {
      "code": "+1 787",
      "name": "Puerto Rico"
    },
    {
      "code": "+974",
      "name": "Qatar"
    },
    {
      "code": "+262",
      "name": "Reunion"
    },
    {
      "code": "+40",
      "name": "Romania"
    },
    {
      "code": "+7",
      "name": "Russia"
    },
    {
      "code": "+250",
      "name": "Rwanda"
    },
    {
      "code": "+685",
      "name": "Samoa"
    },
    {
      "code": "+378",
      "name": "San Marino"
    },
    {
      "code": "+966",
      "name": "Saudi Arabia"
    },
    {
      "code": "+221",
      "name": "Senegal"
    },
    {
      "code": "+381",
      "name": "Serbia"
    },
    {
      "code": "+248",
      "name": "Seychelles"
    },
    {
      "code": "+232",
      "name": "Sierra Leone"
    },
    {
      "code": "+65",
      "name": "Singapore"
    },
    {
      "code": "+421",
      "name": "Slovakia"
    },
    {
      "code": "+386",
      "name": "Slovenia"
    },
    {
      "code": "+677",
      "name": "Solomon Islands"
    },
    {
      "code": "+27",
      "name": "South Africa"
    },
    {
      "code": "+500",
      "name": "South Georgia and the South Sandwich Islands"
    },
    {
      "code": "+82",
      "name": "South Korea"
    },
    {
      "code": "+34",
      "name": "Spain"
    },
    {
      "code": "+94",
      "name": "Sri Lanka"
    },
    {
      "code": "+249",
      "name": "Sudan"
    },
    {
      "code": "+597",
      "name": "Suriname"
    },
    {
      "code": "+268",
      "name": "Swaziland"
    },
    {
      "code": "+46",
      "name": "Sweden"
    },
    {
      "code": "+41",
      "name": "Switzerland"
    },
    {
      "code": "+963",
      "name": "Syria"
    },
    {
      "code": "+886",
      "name": "Taiwan"
    },
    {
      "code": "+992",
      "name": "Tajikistan"
    },
    {
      "code": "+255",
      "name": "Tanzania"
    },
    {
      "code": "+66",
      "name": "Thailand"
    },
    {
      "code": "+670",
      "name": "Timor Leste"
    },
    {
      "code": "+228",
      "name": "Togo"
    },
    {
      "code": "+690",
      "name": "Tokelau"
    },
    {
      "code": "+676",
      "name": "Tonga"
    },
    {
      "code": "+1 868",
      "name": "Trinidad and Tobago"
    },
    {
      "code": "+216",
      "name": "Tunisia"
    },
    {
      "code": "+90",
      "name": "Turkey"
    },
    {
      "code": "+993",
      "name": "Turkmenistan"
    },
    {
      "code": "+1 649",
      "name": "Turks and Caicos Islands"
    },
    {
      "code": "+688",
      "name": "Tuvalu"
    },
    {
      "code": "+1 340",
      "name": "U.S. Virgin Islands"
    },
    {
      "code": "+256",
      "name": "Uganda"
    },
    {
      "code": "+380",
      "name": "Ukraine"
    },
    {
      "code": "+971",
      "name": "United Arab Emirates"
    },
    {
      "code": "+44",
      "name": "United Kingdom"
    },
    {
      "code": "+1",
      "name": "United States"
    },
    {
      "code": "+598",
      "name": "Uruguay"
    },
    {
      "code": "+998",
      "name": "Uzbekistan"
    },
    {
      "code": "+678",
      "name": "Vanuatu"
    },
    {
      "code": "+58",
      "name": "Venezuela"
    },
    {
      "code": "+84",
      "name": "Vietnam"
    },
    {
      "code": "+1 808",
      "name": "Wake Island"
    },
    {
      "code": "+681",
      "name": "Wallis and Futuna"
    },
    {
      "code": "+967",
      "name": "Yemen"
    },
    {
      "code": "+260",
      "name": "Zambia"
    },
    {
      "code": "+255",
      "name": "Zanzibar"
    },
    {
      "code": "+263",
      "name": "Zimbabwe"
    }
  ];


  role            = "jury"
  regTypeArt      :string;
  regTypeArtOther :boolean = false;
  registerData    :any = [];
  validPattern    = "^[a-zA-Z0-9#?!@$%^&*-]{8,12}$";
  phonePattern    = "^[0-9]{10}$";
  namePattern    = "^[a-zA-Z ]{1,50}$";
  emailPattern    = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
  positionOptions : TooltipPosition[] = ['below'];
  // Form control variables
  position        = new FormControl(this.positionOptions[0]);
  checked         = new FormControl('', [Validators.required]);
  checkedConsent  = new FormControl('', [Validators.required]);
  firstName       = new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]);
  lastName        = new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]);
  emailID         = new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]);
  phoneNumber     = new FormControl('', [Validators.required,Validators.pattern(this.phonePattern)]);
  countryCode     = new FormControl('+91', [Validators.required]);
  password        = new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]);
  rePassword      = new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]);
  //typeOfArt       = new FormControl('', [Validators.required]);
  typeOfArtText   = new FormControl('');
  // experience      = new FormControl('', [Validators.required]);
  // End

  hide            = true;
  hidep           = true;
  passwordMatch   = false;
  otpResponse     :any = [];
  otpButton       :string = 'Generate OTP';
  popupClass      :string;
  popupClassC     :string;
  socialUser      :any = [];
  getData         :any = [];
  getData2        :any = [];
  registerUserForm:FormGroup;
  public user: SocialUser = new SocialUser;
  constructor(private http              :HttpClient,
              public  router            :Router,public data:SharedDataService,
              private socialAuthService :SocialAuthService,
              public  builder           :FormBuilder) {
      this.registerUserForm = this.builder.group({
        email:      this.emailID,
        mobileNo:   this.phoneNumber,
        pass:       this.password,
        cCode:      this.countryCode,
        repass:     this.rePassword,
        check:      this.checked,
        checkOther: this.checkedConsent,
        fName:      this.firstName,
        lName:      this.lastName,
       // tArt:       this.typeOfArt,
        // exprnce:    this.experience
      },{ validators: [MatchValidator.validate]});


      
     }

  ngOnInit(): void {
    window.scroll(0,0);

    google.accounts.id.initialize({
      client_id: '697919762318-gh43ci9ou5tol86njho8t1vgqljd45uf.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleSignIn(response)
    });

    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        this.renderGoogleSignInButton();
      }
    });

 
    if (this.data.loginFlag) {
      this.router.navigate(['//']);
      return;
    }
    this.data.loadingClass = 'loadBG d-none';
    this.popupClass = "popupHead img-fluid d-none"
    this.popupClassC = "popupHead img-fluid d-none"
    this.data.customObservable.subscribe((res) => {
      //this.details();
    }
  );
  // this.resetForm();
  this.http.get(''+this.data.apiDomainPathDash+'getTermsAndConditions',{ headers: {'url-Name':'ecommerce'} }) // Get privacy details
  .subscribe(data => {
 
    this.getData = data;
    this.getData = this.getData.response[0];
  },
  err => {
    // Swal.fire(err);
  });
  this.http.get(''+this.data.apiDomainPathDash+'getConsentOfData',{ headers: {'url-Name':'ecommerce'} }) // Get privacy details
  .subscribe(data => {

    this.getData2 = data;
    this.getData2 = this.getData2.response[0];
  },
  err => {
    // Swal.fire(err);
  });


  
  }


  handleGoogleSignIn(response: any): void {
    // Handle the Google Sign-In response
    ///console.log('Google Sign-In response:', response);
    //console.log(response.credential);

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); 
    const UserD = JSON.parse(jsonPayload);
    this.emailID.reset(UserD.email);
    this.firstName.reset(UserD.given_name);
    this.lastName.reset(UserD.family_name);
  }

  renderGoogleSignInButton(): void {
    google.accounts.id.renderButton(
      document.getElementById('google'),
      { } // customization attributes
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onChangeType(value:any) {
    this.regTypeArt = value.value;
    if (this.regTypeArt == 'other') {
      this.regTypeArtOther = true;
    } else{
      this.regTypeArtOther = false;
    }
  }

  validateFormFields() {
   // console.log(this);
    if (this.firstName.hasError('required') || this.lastName.hasError('required')  || this.phoneNumber.hasError('required') || this.emailID.hasError('required')) {
      return 'Mandatory field';
    } else
    return this.emailID.hasError('email') ? 'Not a valid email' : '';
  }

  nameValidator() {
    if (this.firstName.hasError('required') || this.lastName.hasError('required'))
      return 'Mandatory field';
    else if (this.firstName.hasError('pattern'))
      return 'Please enter only characters'
    else
      return '';
  }

  emailValidator() {
    if (this.emailID.hasError('required')) {
      return 'Mandatory field';
    } else if (this.emailID.hasError('email'))
        return 'Not a valid email'
      else  if (this.emailID.hasError('pattern'))
      return 'Not a valid email'
  }

  passwordVerifyFirst() {
    if (this.password.hasError('required'))
      return 'Please enter your password';
      else if (this.password.hasError('pattern')) {
      return "Password doesn't match the criteria";
      }
  }
  
  passwordVerifySecond() {
    if (this.rePassword.hasError('required'))
      return 'Please enter your password';
      else if (this.rePassword.hasError('pattern')) {
      return "Password doesn't match the criteria";
      }
  }

  phoneNumberValidator() {
    if (this.phoneNumber.hasError('required'))
      return 'Please enter your PhoneNumber';
    else if (this.phoneNumber.hasError('pattern')) {
      return 'Please Enter valid PhoneNumber';
    }
  }

  checkPass() {
    // console.log(this.password.value)
    // console.log(this.rePassword.value)
    if (this.rePassword.value != this.password.value) {
      this.passwordMatch = true;
    } else this.passwordMatch = false;
    //console.log('Match value '+this.passwordMatch);
  }

  registerUser() {
    if (this.registerUserForm.invalid) {
      this.data.firePopup(false,'Check all mandatory fields');
      return;
    }
    this.data.loadingClass = 'loadBG d-block';
    var registerDatas = {
      firstName:    this.firstName.value,
      lastName:     this.lastName.value,
      emailId:      this.emailID.value,
      mobileNo:     this.phoneNumber.value,
      password:     this.password.value,
      role:         this.role,
      //typeOfArt:    this.typeOfArt.value,
      // experience:   this.experience.value,
      countryCode:  this.countryCode.value
    }
    // console.log(registerDatas);
    this.http.post(''+this.data.apiDomainPath+'register',registerDatas,{ headers: {'url-Name':'ecommerce'} })
    .subscribe(data => {
     
      this.registerData = data;
      this.data.loadingClass = 'loadBG d-none';
      if (this.registerData.responseCode == "200") {
        this.data.firePopup(true,'User registered');
        this.router.navigate(['//']);
      } else if (this.registerData.responseCode == 803) {
        this.data.firePopup(false,'Something went wrong..!!!');
      }else {
        this.data.firePopup(false,this.registerData.responseMsg);
      }
    },
    err => {
      this.data.loadingClass = 'loadBG d-none';
      ///console.log('Error: ' + err);
    });
  }

  popImage() {
    this.popupClass = "popupHead img-fluid d-block";
  }

  popImageC() {
    this.popupClassC = "popupHead img-fluid d-block";
  } 

  closePopImage() {
    this.popupClassC = "popupHead img-fluid d-none";
    this.popupClass = "popupHead img-fluid d-none";
  }

  

  getFbDetails() {

   
    this.data.accesData = true;
    this.data.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    //console.log( this.data.socialAuthService);
    this.detailfb();
    
  }

  // getGoogleDetails() {
 

  //       this.data.accesData = true;
  //       this.data.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //       // console.log( this.data.socialAuthService);
  //       this.details();
    
  // }

  // details() {    
  //   this.emailID.reset(this.data.sEmailId);
  //   this.firstName.reset(this.data.sFirstName);
  //   this.lastName.reset(this.data.sLastName);

   
  // }

  detailfb() {    
    //console.log("regTriggered");
    ///console.log(this.data.sEmailId);
    this.emailID.reset(this.data.sEmailId);
    this.firstName.reset(this.data.sFirstName);
    this.lastName.reset(this.data.sLastName);
  }

  resetForm() {
    this.emailID.reset('');
    this.firstName.reset('');
    this.lastName.reset('');
    this.phoneNumber.reset('');
    this.password.reset('');
    this.rePassword.reset('');
    //this.typeOfArt.reset('');
    // this.experience.reset('');
    this.countryCode.reset('');
  }

  sendOTP() {
    this.data.loadingClass = 'loadBG d-block';
    this.http.post(''+this.data.apiDomainPath+'sendOpt',{mobileNo:this.phoneNumber.value},{ headers: {'url-Name':'ecommerce'} })
    .subscribe(data => {
     
      this.otpResponse = data
      this.data.loadingClass = 'loadBG d-none';
      if (this.otpResponse.responseCode == "200") {
        this.data.firePopup(true,'OTP has been sent');
        this.otpButton = 'Resend OTP'
      } else {
        this.data.firePopup(false,this.otpResponse.responseMsg);
      }
    },
    err => {
      this.data.loadingClass = 'loadBG d-none';
    });
  }
}

export class MatchValidator {
  static validate(group: AbstractControl): ValidationErrors | null { 
    const password = group.get('pass')?.value;
    const confirmPassword = group.get('repass')?.value;
    if (password != confirmPassword) {
      group.get('repass').setErrors( {notMatching: true} );
  } else {
      return null
  }
  };
}

export class ComparisonErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent) && (control?.touched ?? false);
  }
}
