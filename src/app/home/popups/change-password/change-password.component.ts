import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpService } from 'src/app/http/http.service'; 
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {

  
  position        = new FormControl('below');
  validPattern    = "^[a-zA-Z0-9#?!@$%^&*-]{8,12}$";
  password        = new FormControl('', [Validators.required]);
  chPassword      = new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]);
  chRepassword    = new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]);
  changeUserData  :any = [];
  changeForm      :FormGroup;
  changePassword  :any=[];
  hide            = true;
  hidep           = true;
  hidec           = true;

  constructor(private api     :HttpService,
              public  router  :Router,
              public  data    :SharedDataService,
              public  builder :FormBuilder)  {
                this.changeForm = this.builder.group({
                  opass:    this.password,
                  pass:     this.chPassword,
                  repass:   this.chRepassword,
                },{ validators: [MatchValidator.validate] });
   }

  ngOnInit(): void {
  }

  passwordVerifyFirst() {
    if (this.chPassword.hasError('required'))
      return 'Please enter your password';
    else if (this.chPassword.hasError('pattern')) {
      return "Password doesn't match the criteria";
      }
  }

  validateFormFields() {
    if (this.password.hasError('required')) {
      return 'Mandatory field';
    } 
  }

  verifyAndCangePswd(){

    var cpData = { // Storing email and passwords for change password
      "emailId"     :this.data.emailId,
      "oldPassword" :this.password.value,
      "password"    :this.chPassword.value
    }

    this.data.loadingClass = 'loadBG d-block';

    this.api.post('SET_CHNG_PASSWORD',cpData).subscribe(res => { // Post call for changing the password
      this.changePassword = res;
      this.data.loadingClass = 'loadBG d-none';
      if (this.changePassword.responseCode == 200) {
        this.password.reset('');
        this.chPassword.reset('');
        this.chRepassword.reset('');
        this.data.firePopup(true,'The pasword has been changed');
        this.data.autoGenerate = '0';
        this.changeUserData = JSON.parse(localStorage.loggedUserDataCommunity);
        this.changeUserData.autoGeneratePassword = 0;
        localStorage.loggedUserDataCommunity = JSON.stringify(this.changeUserData);
        this.data.loggedUser(this.changeUserData);
        this.data.signOutAll();
      } else if (this.changePassword.responseCode == 805) {
        this.data.firePopup(false,"Current passowrd dosen't match");
      } else {
        this.data.firePopup(false,this.changePassword.responseMsg);
      }
    });
  }
}


export class MatchValidator {
  // (group: AbstractControl) is the form group but needs to be AbstractControl instead of (group: FormGroup) to remove deprecation warning. 
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
    const invalidCtrl   = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent) && (control?.touched ?? false);
  }
}

